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
    .sort({'totalNumOfTimesInTest': 1}) //Pick the color combs with least views
    .limit(5)     //The number of colors used in the test
    .exec(function(err, colors) {
      if(err) { return handleError(res, err);}
      var questions = [];
      var combinationsIndices = [];

      //Generate all unique combinations of picking 2 out of 5 (total 10 combinations)
      for(var i = 0; i < 5; i++){
        for(var j = i + 1; j < 5; j++){
          combinationsIndices.push([i,j]);
        }
      }
      for(var i = 0; i < 10; i++){
        var index = Math.floor((Math.random() * combinationsIndices.length)); //Randomize index from the array of combinations
        var comb = combinationsIndices.splice(index,1); //Get (and remove) the randomized combination

        //Add that combination as a new question
        questions.push({
          img1: colors[comb[0][0]].id,
          img1_url: colors[comb[0][0]].image_secureurl,
          img2: colors[comb[0][1]].id,
          img2_url: colors[comb[0][1]].image_secureurl,
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
          res.status(200).json();
        }
      });
    });
}
// JSON API for list of polls
//
exports.list = function(req, res) {
  //console.log(req.session.questions);

  if(req.session.questions){
    res.status(200).json(req.session.questions);
  }
  else{
     res.status(500).send('error');
  }
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
      res.status(200).send(req.session.questions);
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

function handleError(res, err) {
  return res.send(500, err);
}
