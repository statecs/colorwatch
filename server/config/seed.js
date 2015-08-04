/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Poll = require('../api/poll/poll.model');

var ColorCombs = require('../api/colorcombs/colorcombs.model');
var mongoose = require('mongoose');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

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
