'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ColorcombsSchema = new Schema({
  textcolor: String,
  backcolor: String,
  image_secureurl: String,
  ELO_rating: [{name: String, rating: Number, numOfVotes: Number, numOfTimesInTest: Number}]
});

module.exports = mongoose.model('Colorcombs', ColorcombsSchema);
