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
  	console.log("data:",data);
    Poll.findById(data.pollId, function(err, poll) {
      if(err) { return res.send(500, err); }

     // console.log("poll", poll);
      var expectedScoreA, expectedScoreB, newRatingA, colorA, colorB, newRatingB, scoreA = 0, scoreB = 0;
      var imagesInTest = [];
      for(var i = 0; i < poll.questions.length; i++){
          console.log(typeof(poll.questions[i].img1), poll.questions[i].img1);
          if(!(String(poll.questions[i].img1) in imagesInTest)){
            imagesInTest.push(String(poll.questions[i].img1))
          }

          if(!(String(poll.questions[i].img2) in imagesInTest)){
            imagesInTest.push(String(poll.questions[i].img2))
          }
      }
      console.log(imagesInTest);
      for(var i = 0; i < poll.questions.length; i++){
        if(poll.questions[i].userVote == 'choice_alt1'){
          scoreA = 1;
        }
        else{
          scoreB = 1;
        }
      /*ColorCombs.find({
            '_id': { $in: [
                poll.questions[i].img1,
                poll.questions[i].img2
            ]}
        }, function(err, docs){
             console.log(docs);
        });*/
        /*ColorCombs.find(mongoose.Types.ObjectId(question.img1.replace(/['"]+/g, ''), function(err, color){
            colorA = color;
        });

        ColorCombs.findById(mongoose.Types.ObjectId(question.img1.replace(/['"]+/g, ''), function(err, color){
            colorB = color;
        });

        expectedScoreA = 1 / (1 + Math.pow(10, (colorB.rating - colorA.rating) / 400));
        expectedScoreB = 1 / (1 + Math.pow(10, (colorA.rating - colorB.rating) / 400));
        
        newRatingA = colorA.rating + (kFactor * (scoreA - expectedScoreA));
        newRatingB = colorB.rating + (kFactor * (scoreB - expectedScoreB));
      
        colorA.rating = newRatingA;
        colorB.rating = newRatingB;
        
        console.log('new ratings', newRatingA, newRatingB, _ratingList);*/  
  	}
  });
});
}