/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Polls = require('./poll.model');

exports.register = function(socket) {
  console.log('register socket');
  Polls.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Polls.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
  socket.on('send:vote', function(data) {
    console.log("data from send:vote", data);
    var ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address.address;
    console.log('data on vote', data);
   /* Polls.findById(data.poll_id, function(err, poll) {
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
        }*/
        
        socket.emit('myvote', {ack: data});
        // socket.broadcast.emit('vote', theDoc);
    // });
  });
}

function onSave(socket, doc, cb) {
  socket.emit('poll:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('poll:remove', doc);
}