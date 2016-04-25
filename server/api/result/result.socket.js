/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var result = require('./result.model');

exports.register = function(socket) {
  result.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  result.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('result:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('result:remove', doc);
}
