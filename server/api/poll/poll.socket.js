/*
 * Broadcast updates to client when the model changes
 */

'use strict';

//GET IMAGE FROM MONGODB VIA ID (line 40-44), THEN UPDATE RATINGS IN DATABASE (line 46-55)!!!

var Poll = require('./poll.model');
var ColorCombs = require('../colorcombs/colorcombs.model');

/**
 * Register the socket for polls
 * @param  {[type]} socket [description]
 * @return {[type]}        [description]
 */
exports.register = function(socket) {
  console.log('register socket');

  socket.on('send:vote', function(data) {
    Poll.findById(data.pollId, function(err, poll) {
      if(err) { return res.send(500, err); }

      var expectedScoreA, expectedScoreB, newRatingA, colorA, colorB, newRatingB, scoreA, scoreB, kFactor = 32;

      //First find all colors in test
      ColorCombs.find(poll.questions, function(err, colors){
        //Loop through all questions in poll to update ELO rating
        for(var i = 0; i < poll.questions.length; i++){
          scoreA = 0;
          scoreB = 0;

          //Find which colors used in the question
          for(var j = 0; j < colors.length; j++){
            if(poll.questions[i].img1.equals(colors[j]._id)){
              colorA = colors[j];
            }
            else if(poll.questions[i].img2.equals(colors[j]._id)){
              colorB = colors[j];
            }
          }
          //Set score depending on user choice
          if(poll.questions[i].userVote == 'choice_alt1'){
            scoreA = 1;
            colorA.numOfVotes++;
          }
          else{
            scoreB = 1;
            colorB.numOfVotes++;
          }
          expectedScoreA = 1 / (1 + Math.pow(10, (colorB.ELO_rating - colorA.ELO_rating) / 400));
          expectedScoreB = 1 / (1 + Math.pow(10, (colorA.ELO_rating - colorB.ELO_rating) / 400));

          newRatingA = colorA.ELO_rating + (kFactor * (scoreA - expectedScoreA));
          newRatingB = colorB.ELO_rating + (kFactor * (scoreB - expectedScoreB));

          colorA.ELO_rating = newRatingA;
          colorB.ELO_rating = newRatingB;
        }
        // Save ratings to DB
        colors.forEach(function(color, index, array){
          color.save(function (err) {
            if (err) {
              throw 'Error in save ratings';
            }
            if (index === array.length - 1) {
              ColorCombs.find(function (err, colors) {
                if (err) {
                  throw 'Error in finding all colorcombs';
                }
                socket.broadcast.emit('vote', colors);
              });
            }
          });
        });
      });
    });
  });
}
