'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ColorcombsSchema = new Schema({
  textcolor: String,
  backcolor: String,
  image_secureurl: String,
  totalRating: Number,
  totalNumOfVotes: Number,
  totalNumOfTimesInTest: Number,
  ELO_rating: [{name: String, rating: Number, numOfVotes: Number, numOfTimesInTest: Number}]
});

module.exports = mongoose.model('Colorcombs', ColorcombsSchema);
