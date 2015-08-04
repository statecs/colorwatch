/*
 * Broadcast updates to client when the model changes
 */

'use strict';

var Poll = require('./poll.model');

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
     var ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address;
    Poll.findById(data.pollId, function(err, poll) {
    	console.log("poll", poll);
      var choice = poll.choices.id(data.choice);
      choice.votes.push({ ip: ip });
      
      poll.save(function(err, doc) {
        var theDoc = { 
          question: doc.question, _id: doc._id, choices: doc.choices, 
          userVoted: false, totalVotes: 0 
        };

        // Loop through poll choices to determine if user has voted
        // on this poll, and if so, what they selected
        for(var i = 0, ln = doc.choices.length; i < ln; i++) {
          var choice = doc.choices[i]; 

          for(var j = 0, jLn = choice.votes.length; j < jLn; j++) {
            var vote = choice.votes[j];
            theDoc.totalVotes++;
            theDoc.ip = ip;

            if(vote.ip === ip) {
              theDoc.userVoted = true;
              theDoc.userChoice = { _id: choice._id, text: choice.text };
            }
          }
        }
       
        socket.emit('myvote', theDoc);
        socket.broadcast.emit('vote', theDoc);
      });
  	});
  });
}
/*function onSave(socket, doc, cb) {
  socket.emit('poll:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('poll:remove', doc);
}*/