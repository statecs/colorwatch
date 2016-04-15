'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResultSchema = new Schema({
  diagnoses: Array,
  disabilities: Array,
  questions: Array
});

module.exports = mongoose.model('Result', ResultSchema);
