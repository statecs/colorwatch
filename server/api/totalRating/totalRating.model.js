'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TotalRatingSchema = new Schema({
  name: String,
  info: String
});

module.exports = mongoose.model('TotalRating', TotalRatingSchema);