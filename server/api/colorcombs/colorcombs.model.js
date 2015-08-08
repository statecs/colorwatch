'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Subdocument schema for votes
var voteSchema = new Schema({ ip: 'String' });

var ColorcombsSchema = new Schema({
  name: String,
  image_url: String,
  votes: [voteSchema]
});

module.exports = mongoose.model('Colorcombs', ColorcombsSchema);