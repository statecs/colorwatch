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
    .limit(5)
    .exec(function(err, colors) {
       // `posts` will be of length 20
       if(err) { return handleError(res, err);}
       console.log('colors', colors);
       var questions = [];

       for(var i = 0; i < 10; i++){
          var index1 = Math.floor((Math.random() * colors.length));
          do{
            var index2 = Math.floor((Math.random() * colors.length));
          } 
          while(index1 == index2);
          questions.push({
            img1: colors[index1].id, 
            img1_url: colors[index1].image_secureurl,
            img2: colors[index2].id,
            img2_url: colors[index2].image_secureurl,
            userVote: null,
            userHasVoted: false
          });
       }

       var poll = new Poll({questions: questions});
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
  var userVote = String(req.body.userVote);
  var questionNr = parseInt(req.body.questionNr);
  var diagnoses = req.body.diagnoses;
  var disabilities = req.body.disabilities;

  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, polls) {
    if (err) { return handleError(res, err); }
    if(!polls) { return res.send(404); }
    if(userVote != "undefined"){
      polls.questions[questionNr-1].userVote = userVote;
      if(userVote){
        polls.questions[questionNr-1].userHasVoted = true;
      }
      else{
        polls.questions[questionNr-1].userHasVoted = false; 
      }
    }
    else{
      polls.diagnoses = diagnoses;
      polls.disabilities = disabilities;
    }
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
  if(req.params.id){
    var myTestId = mongoose.Types.ObjectId(req.params.id.replace(/['"]+/g, ''));
    // Find the test by its ID, and return all the questions
    Poll.findById(myTestId, function(err, poll) {
      if(err) { return handleError(res, err); }
      return res.json(poll.questions);
      
    });
  }
  else{
    res.send(500, 'error');
  }

};

function handleError(res, err) {
  return res.send(500, err);
}