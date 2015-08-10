'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');
var ColorCombs = require('../colorcombs/colorcombs.model');
var mongoose = require('mongoose');

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
 * JSON API for creating new polls, stored on clientside in sessionStorage/cookieStorage
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
       
       var questions = [];
       questions.push({
        img1: colors[0].id, 
        img1_url: colors[0].image_url,
        img2: colors[1].id,
        img2_url: colors[1].image_url,
        userVote: 'alt1'
      });
       questions.push({
        img1: colors[1].id, 
        img1_url: colors[1].image_url,
        img2: colors[0].id,
        img2_url: colors[0].image_url,
        userVote: 'alt1'
      });
       var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        

       var poll = new Poll({ip: ip, questions: questions});
       // Save poll to DB
      poll.save(function(err, doc) {
        if(err || !doc) {
          throw 'Error';
        } else {
          res.json(doc);
        }   
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
  console.log('update', req.body);
  var userVote = String(req.body.userVote);
  var questionNr = parseInt(req.body.questionNr);

  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, polls) {
    if (err) { return handleError(res, err); }
    if(!polls) { return res.send(404); }
    polls.questions[questionNr-1].userVote = userVote;
    polls.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, polls);
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
  if(req.cookies.myTest){
    var myTestId = mongoose.Types.ObjectId(req.cookies.myTest.replace(/['"]+/g, ''));
    console.log('testid', myTestId);
  }

  // Find the test by its ID, and return all the questions
  Poll.findById(myTestId, function(err, poll) {
    if(err) { return handleError(res, err); }
    return res.json(poll.questions);
    
  });
};

function handleError(res, err) {
  return res.send(500, err);
}