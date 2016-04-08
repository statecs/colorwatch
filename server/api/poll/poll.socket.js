/*
 * Broadcast updates to client when the model changes
 */

'use strict';

//GET IMAGE FROM MONGODB VIA ID (line 40-44), THEN UPDATE RATINGS IN DATABASE (line 46-55)!!!

var ColorCombs = require('../colorcombs/colorcombs.model');
var mongoose = require('mongoose');

function objectFindKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === value) {
      return i;
    }
  }
  return -1;
}

/*
 * Updates the ELO rating for a single object and the number of votes and times in test
 * INPUT:
 * - ratingObjectA: first ratingobject from a single poll
 * - ratingObjectB: second ratingobject from a single poll
 * - scoreA: 1 if ratingObjectA is the choosen, otherwise 0
 * - scoreB: same as for scoraA but for ratingObjectB
 * */
function updateELOandVotes(ratingObjectA, ratingObjectB, scoreA, scoreB) {
  //Calculate ELO rating
  var kFactor = 32;

  var expectedScoreA = 1 / (1 + Math.pow(10, (ratingObjectB.rating - ratingObjectA.rating) / 400));
  var expectedScoreB = 1 / (1 + Math.pow(10, (ratingObjectA.rating - ratingObjectB.rating) / 400));

  var newRatingA = ratingObjectA.rating + (kFactor * (scoreA - expectedScoreA));
  var newRatingB = ratingObjectB.rating + (kFactor * (scoreB - expectedScoreB));

  ratingObjectA.rating = newRatingA;
  ratingObjectB.rating = newRatingB;

  //Update number of votes for this ratingobject
  if (scoreA === 1) ratingObjectA.numOfVotes++;
  else ratingObjectB.numOfVotes++;

  //Update number of times being shown in test for this raincoat
  ratingObjectA.numOfTimesInTest++;
  ratingObjectB.numOfTimesInTest++;
}
/**
 * Register the socket for polls
 * @param  {[type]} socket [description]
 * @return {[type]}        [description]
 */
exports.register = function (socket) {
  console.log('register socket');

  socket.on('send:vote', function (sendVote) {
    var totalRatingIndex = 0,
      otherDiagnoseIndex = 1,
      otherDisabilitiyIndex = 2;

    var colorA, colorB, scoreA, scoreB, indexELO;

    //First find all colors in test
    ColorCombs.find(sendVote.data.questions, function (err, colors) {
      //Loop through all questions in poll to update ELO rating
      for (var i = 0; i < sendVote.data.questions.length; i++) {
        scoreA = 0;
        scoreB = 0;

        //Find which colors used in the current question
        for (var j = 0; j < colors.length; j++) {
          console.log(colors[j]._id);
          if (mongoose.Types.ObjectId(sendVote.data.questions[i].img1).equals(colors[j]._id)) {
            colorA = colors[j];
          }
          else if (mongoose.Types.ObjectId(sendVote.data.questions[i].img2).equals(colors[j]._id)) {
            colorB = colors[j];
          }
        }
        //Set score depending on user choice
        if (sendVote.data.questions[i].userVote === 'choice_alt1') {
          scoreA = 1;
        }
        else {
          scoreB = 1;
        }

        var k;
        //Updating ELO rating for the chosen disabilities
        for (k = 0; k < sendVote.data.disabilities.length; k++) {
          indexELO = objectFindKey(colorA.ELO_rating, 'name', sendVote.data.disabilities[k]);
          if (indexELO !== -1) {
            updateELOandVotes(colorA.ELO_rating[indexELO], colorB.ELO_rating[indexELO], scoreA, scoreB);
          }
          else if (indexELO === -1 && sendVote.data.disabilities[k].length !== 0) {
            updateELOandVotes(colorA.ELO_rating[otherDisabilitiyIndex], colorB.ELO_rating[otherDisabilitiyIndex], scoreA, scoreB);
          }
          else {
            console.log("Couldn't update ELO rating for disabilities");
          }
        }

        //Updating ELO rating for the chosen diagnoses
        for (k = 0; k < sendVote.data.diagnoses.length; k++) {
          indexELO = objectFindKey(colorA.ELO_rating, 'name', sendVote.data.diagnoses[k]);
          if (indexELO !== -1) {
            updateELOandVotes(colorA.ELO_rating[indexELO], colorB.ELO_rating[indexELO], scoreA, scoreB);
          }
          else if (indexELO === -1 && sendVote.data.diagnoses[k].length !== 0) {
            updateELOandVotes(colorA.ELO_rating[otherDiagnoseIndex], colorB.ELO_rating[otherDiagnoseIndex], scoreA, scoreB);
          }
          else {
            console.log("Couldn't update ELO rating for diagnoses");
          }
        }
        //Update total rating, index 0 indicates total
        updateELOandVotes(colorA.ELO_rating[totalRatingIndex], colorB.ELO_rating[totalRatingIndex], scoreA, scoreB);
      }
      // Save ratings to DB
      colors.forEach(function (color, index, array) {
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
};
