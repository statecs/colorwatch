'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ColorCombs = require('../colorcombs/colorcombs.model');;

// Subdocument schema for votes
var voteSchema = new Schema({ ip: 'String' });

// Subdocument schema for poll choices
var choiceSchema = new Schema({ 
	img1: {type: Schema.Types.ObjectId, ref: 'ColorCombs'},
	img1_url: String,
	img2: {type: Schema.Types.ObjectId, ref: 'ColorCombs'},
	img2_url: String,
	userVote: String
});

// Document schema for polls
var PollSchema = new Schema({
	ip: String,
	questions: [{
		img1: {type: Schema.Types.ObjectId, ref: 'ColorCombs'},
		img1_url: String,
		img2: {type: Schema.Types.ObjectId, ref: 'ColorCombs'},
		img2_url: String,
		userVote: String
	}],
	diagnoses: Array,
	disabilities: Array
});

module.exports = mongoose.model('Poll', PollSchema);