'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');
var ColorCombs = require('../colorcombs/colorcombs.model');
var mongoose = require('mongoose');

/**
 * JSON API for creating new polls, stored on clientside in sessionStorage/cookieStorage
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.newpolls = function(req, res) {
  ColorCombs
    .find()
    .sort({'ELO_rating.numOfTimesInTest': 1}) //Pick the color combs with least views
    .limit(5)     //The number of colors used in the test
    .exec(function(err, colors) {
       // `posts` will be of length 20
       if(err) { return handleError(res, err);}
       var questions = [];

       for(var i = 0; i < 10; i++){
          var index1 = Math.floor((Math.random() * colors.length));
          do{
            var index2 = Math.floor((Math.random() * colors.length));
          }
          while(index1 === index2);
          questions.push({
            img1: colors[index1].id,
            img1_url: colors[index1].image_secureurl,
            img2: colors[index2].id,
            img2_url: colors[index2].image_secureurl,
            userVote: null,
            userHasVoted: false
          });
       }
      req.session.questions = questions;

      req.session.save(function(err) {
        if(err){
          throw 'Error in list';
        }
        else{
          res.json(200, {});
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

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  var userVote = String(req.body.userVote);
  var questionNr = parseInt(req.body.questionNr);

  if(req.session.questions){
    if(userVote !== "undefined"){
      req.session.questions[questionNr-1].userVote = userVote;
      if(userVote){
        req.session.questions[questionNr-1].userHasVoted = true;
      }
      else{
        req.session.questions[questionNr-1].userHasVoted = false;
      }
      res.send(200, req.session.questions);
    }
  }
  else{
    res.send(500, 'error');
  }
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
  if(req.session.questions){
    res.json(200, req.session.questions);
  }
  else{
    res.send(500, 'error');
  }

};

function handleError(res, err) {
  return res.send(500, err);
}
