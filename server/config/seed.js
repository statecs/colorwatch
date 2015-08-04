/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Poll = require('../api/poll/poll.model');

var ColorCombs = require('../api/colorcombs/colorcombs.model');
var mongoose = require('mongoose');

//Creating colorcombinations used in test
/*ColorCombs.find({}).remove(function() {
  ColorCombs.create({
    provider: 'local',
    _id: mongoose.Schema.Types.ObjectID('AAAA'),
    name: 'Svart text med vit bakgrund',
    image_url: 'https://s3.eu-central-1.amazonaws.com/colorwatch/color-images-test/color_blw.png',
    votes: []
  }, {
    provider: 'local',
    _id: mongoose.Schema.Types.ObjectID('AAAB'),
    name: 'Vit text med svart bakgrund',
    image_url: 'https://s3.eu-central-1.amazonaws.com/colorwatch/color-images-test/color_wbl.png',
    votes: []
  }, function() {
      console.log('finished populating colorcombs');
    }
  );
});
*/
//Creating user for login possibility
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

//Creating polls used in test
Poll.find({}).remove(function() {
  Poll.create({
    provider: 'local',
    question: 'Svart/vit mot vit/svart',
    choices: [{
        text: 'svart/vit', 
        image_url: 'https://s3.eu-central-1.amazonaws.com/colorwatch/color-images-test/color_blw.png', 
        votes: []
      },{
          text: 'vit/svart', 
          image_url: 'https://s3.eu-central-1.amazonaws.com/colorwatch/color-images-test/color_wbl.png',
          votes: []
      }
    ]
  },{
    provider: 'local',
    question: 'Svart/vit mot blå/vit',
    choices: [{
        text: 'svart/vit', 
        image_url: 'https://s3.eu-central-1.amazonaws.com/colorwatch/color-images-test/color_blw.png', 
        votes: []
      },{
          text: 'blå/vit', 
          image_url: 'https://s3.eu-central-1.amazonaws.com/colorwatch/color-images-test/color_bw.png',
          votes: []
      }
    ]  
  }, function() {
      console.log('finished populating polls - with urls');
    }
  );
});
