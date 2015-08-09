'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');
var ColorCombs = require('../colorcombs/colorcombs.model');

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

/**
 * JSON API for creating new polls, stored on clientside in sessionStorage
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.newpolls = function(req, res) {
  ColorCombs
    .find()
    .sort({'__v': 1})
    .limit(2)
    .exec(function(err, colors) {
       // `posts` will be of length 20
       if(err) { return handleError(res, err);}
       //res.json(colors);
       res.json({
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        questions:[{
          img1:{
            id: colors[0].id,
            img_url: colors[0].image_url,
            vote: null
          },
          img2:{
            id: colors[1].id,
            img_url: colors[1].image_url,
            vote: null
          }
        }],
        disabilities: [],
        diagnoses: []
       });
    });
}
// JSON API for list of polls
// 
exports.list = function(req, res) {
  // Query Mongo for polls, just get back the question text
  // 
  
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

function handleError(res, err) {
  return res.send(500, err);
}