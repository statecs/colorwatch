/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Colorcombs = require('./colorcombs.model');

exports.register = function(socket) {
  Colorcombs.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Colorcombs.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('colorcombs:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('colorcombs:remove', doc);
}