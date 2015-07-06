'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');

// Get list of polls
exports.index = function(req, res) {
  Poll.find(function (err, polls) {
    if(err) { return handleError(res, err); }
    return res.json(200, polls);
  });
};

// Get a single poll
exports.show = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    return res.json(poll);
  });
};

// JSON API for list of polls
exports.list = function(req, res) {
  // Query Mongo for polls, just get back the question text
  Poll.find({}, 'question', function(error, polls) {
    if(error){
      throw 'Error in list';
    }
    else{
      res.json(polls);
    }
  });
};

// Creates a new poll in the DB.
exports.create = function(req, res) {
  /*Poll.create(req.body, function(err, poll) {
    if(err) { return handleError(res, err); }
    return res.json(201, poll);
  });*/
  var reqBody = req.body,
      // Filter out choices with empty text
      choices = reqBody.choices.filter(function(v) { return v.text !== ''; }),
      // Build up poll object to save
      pollObj = {question: reqBody.question, choices: choices};
        
  // Create poll model from built up poll object
  var poll = new Poll(pollObj);
  
  // Save poll to DB
  poll.save(function(err, doc) {
    if(err || !doc) {
      throw 'Error';
    } else {
      res.json(doc);
    }   
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    var updated = _.merge(poll, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, poll);
    });
  });
};

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    poll.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// JSON API for getting a single poll
exports.poll = function(req, res) {
  // Poll ID comes in the URL
  var pollId = req.params.id;
  
  // Find the poll by its ID, use lean as we won't be changing it
  Poll.findById(pollId, '', { lean: true }, function(err, poll) {
    if(poll) {
      var userVoted = false,
          userChoice,
          totalVotes = 0;

      // Loop through poll choices to determine if user has voted
      // on this poll, and if so, what they selected
      for (var c in poll.choices) {
        var choice = poll.choices[c]; 

        for (var v in choice.votes) {
          var vote = choice.votes[v];
          totalVotes++;

          if(vote.ip === (req.header('x-forwarded-for') || req.ip)) {
            userVoted = true;
            userChoice = { _id: choice._id, text: choice.text };
          }
        }
      }

      // Attach info about user's past voting on this poll
      poll.userVoted = userVoted;
      poll.userChoice = userChoice;

      poll.totalVotes = totalVotes;
    
      res.json(poll);
    } else {
      res.json({error:true});
    }
  });
};
/**
 * [vote description]
 * @param  {[type]} socket [description]
 * @return {[type]}        [description]
 */
exports.vote = function(socket) {
  console.log("socket vote", socket);
  socket.on('send:vote', function(data) {
    var ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address;
    console.log('data on vote', data);
    Polls.findById(data.poll_id, function(err, poll) {
      var choice = poll.choices.id(data.choice);
      choice.votes.push({ ip: ip });
      
      poll.save(function(err, doc) {
        var theDoc = { 
          question: doc.question, _id: doc._id, choices: doc.choices, 
          userVoted: false, totalVotes: 0 
        };

        // Loop through poll choices to determine if user has voted
        // on this poll, and if so, what they selected
        for(var i = 0, ln = doc.choices.length; i < ln; i++) {
          var choice = doc.choices[i]; 

          for(var j = 0, jLn = choice.votes.length; j < jLn; j++) {
            var vote = choice.votes[j];
            theDoc.totalVotes++;
            theDoc.ip = ip;

            if(vote.ip === ip) {
              theDoc.userVoted = true;
              theDoc.userChoice = { _id: choice._id, text: choice.text };
            }
          }
        }
        
        socket.emit('myvote', theDoc);
        socket.broadcast.emit('vote', theDoc);
      });     
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}