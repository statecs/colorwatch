'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Subdocument schema for votes
var voteSchema = new Schema({ ip: 'String' });

var ColorcombsSchema = new Schema({
  textcolor: String,
  backcolor: String,
  image_secureurl: String,
  votes: [voteSchema]
});

module.exports = mongoose.model('Colorcombs', ColorcombsSchema);