'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Subdocument schema for votes
var voteSchema = new Schema({ ip: 'String' });

// Subdocument schema for poll choices
var choiceSchema = new Schema({ 
	text: String,
	image_url: String,
	votes: [voteSchema]
});

// Document schema for polls
var PollSchema = new Schema({
	question: { type: String, required: true },
	choices: [choiceSchema]
});

module.exports = mongoose.model('Poll', PollSchema);