'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ColorCombSchema = new Schema({
  name: String,
  info: String
});

module.exports = mongoose.model('ColorComb', ColorCombSchema);