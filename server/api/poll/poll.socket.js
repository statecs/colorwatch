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
  /*Poll.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Poll.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });*/
  socket.on('send:vote', function(data) {
  	Poll.findById(data.pollId, function(err, poll) {
      if(err) { return res.send(500, err); }

      //console.log("poll", poll);
      var expectedScoreA, expectedScoreB, newRatingA, colorA, colorB, newRatingB, scoreA, scoreB, kFactor = 32;
      var imagesInTest = [];
      ColorCombs.find(poll.questions, function(err, colors){
        //console.log(colors);
        for(var i = 0; i < poll.questions.length; i++){
          console.log('------------' + i + '-----------------');
          scoreA = 0;
          scoreB = 0;
          for(var j = 0; j < colors.length; j++){
            if(poll.questions[i].img1.equals(colors[j]._id)){
              colorA = colors[j];
            }
            else if(poll.questions[i].img2.equals(colors[j]._id)){
              colorB = colors[j];
            }
          }
          if(poll.questions[i].userVote == 'choice_alt1'){
            scoreA = 1;
          }
          else{
            scoreB = 1;
          }

          expectedScoreA = 1 / (1 + Math.pow(10, (colorB.ELO_rating - colorA.ELO_rating) / 400));
          expectedScoreB = 1 / (1 + Math.pow(10, (colorA.ELO_rating - colorB.ELO_rating) / 400));

          newRatingA = colorA.ELO_rating + (kFactor * (scoreA - expectedScoreA));
          newRatingB = colorB.ELO_rating + (kFactor * (scoreB - expectedScoreB));
          console.log(
            "scoreA", scoreA,
            "scoreB", scoreB,
            "expectedScoreA", expectedScoreA,
            "expectedScoreB", expectedScoreB,
            "newRatingA", newRatingA,
            "newRatingB", newRatingB);

          colorA.ELO_rating = newRatingA;
          colorB.ELO_rating = newRatingB;
        }
        // Save ratings to DB
        console.log(colors);
        //console.log('new ratings', newRatingA, newRatingB);
        colors.forEach(function(color){
          color.save(function (err) {
            if (err) {
              throw 'Error in save ratings';
            }
          });
        });
      });
  	//}
  });
});
}
