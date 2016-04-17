'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ColorCombs = require('../colorcombs/colorcombs.model');

// Document schema for polls
var PollSchema = new Schema({
	questions: [{
		img1: {type: Schema.Types.ObjectId, ref: 'ColorCombs'},
		img1_url: String,
		img2: {type: Schema.Types.ObjectId, ref: 'ColorCombs'},
		img2_url: String,
		userVote: String,
		userHasVoted: Boolean
	}],
	diagnoses: Array,
	disabilities: Array
});

module.exports = mongoose.model('Poll', PollSchema);
