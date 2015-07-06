/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var poll = require('./poll.model');

exports.register = function(socket) {
  poll.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  poll.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('poll:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('poll:remove', doc);
}