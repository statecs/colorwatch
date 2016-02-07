/*
 * Broadcast updates to client when the model changes
 */

'use strict';

//GET IMAGE FROM MONGODB VIA ID (line 40-44), THEN UPDATE RATINGS IN DATABASE (line 46-55)!!!

var Poll = require('./poll.model');
var ColorCombs = require('../colorcombs/colorcombs.model');

function objectFindKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === value) {
      return i;
    }
  }
  return -1;
}

function calculateELORating(ratingObjectA, ratingObjectB, scoreA, scoreB){
  var kFactor = 32;

  var expectedScoreA = 1 / (1 + Math.pow(10, (ratingObjectB.rating - ratingObjectA.rating) / 400));
  var expectedScoreB = 1 / (1 + Math.pow(10, (ratingObjectA.rating - ratingObjectB.rating) / 400));

  var newRatingA = ratingObjectA.rating + (kFactor * (scoreA - expectedScoreA));
  var newRatingB = ratingObjectB.rating + (kFactor * (scoreB - expectedScoreB));

  ratingObjectA.rating = newRatingA;
  ratingObjectB.rating = newRatingB;
}

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

      var colorA, colorB, scoreA, scoreB, indexELO, newELORating;

      //First find all colors in test
      ColorCombs.find(poll.questions, function(err, colors){
        //Loop through all questions in poll to update ELO rating
        for(var i = 0; i < poll.questions.length; i++){
          scoreA = 0;
          scoreB = 0;

          //Find which colors used in the current question
          for(var j = 0; j < colors.length; j++){
            if(poll.questions[i].img1.equals(colors[j]._id)){
              colorA = colors[j];
              colorA.numOfTimesInTest++;
            }
            else if(poll.questions[i].img2.equals(colors[j]._id)){
              colorB = colors[j];
              colorB.numOfTimesInTest++;
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

          var k;
          //Updating ELO rating for the chosen disabilities
          for(k = 0; k < poll.disabilities.length; k++){
            indexELO = objectFindKey(colorA.ELO_rating, 'name', poll.disabilities[k]);
            if(indexELO != -1){
              newELORating = calculateELORating(colorA.ELO_rating[indexELO], colorB.ELO_rating[indexELO], scoreA, scoreB);
            }
            else{
              console.log("Couldn't update ELO rating for disabilities");
            }
          }

          //Updating ELO rating for the chosen diagnoses
          for(k = 0; k < poll.diagnoses.length; k++){
            indexELO = objectFindKey(colorA.ELO_rating, 'name', poll.diagnoses[k]);
            if(indexELO != -1){
              newELORating = calculateELORating(colorA.ELO_rating[indexELO], colorB.ELO_rating[indexELO], scoreA, scoreB);
            }
            else{
              console.log("Couldn't update ELO rating for diagnoses");
            }
          }

          //Update total rating, index 0 indicates total
          calculateELORating(colorA.ELO_rating[0], colorB.ELO_rating[0], scoreA, scoreB);
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
