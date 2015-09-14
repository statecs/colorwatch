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
ColorCombs.find({}).remove(function() {
  ColorCombs.create({
      textcolor: '#c32020',
      backcolor: '#000000',
      image_secureurl: 'https://res.cloudinary.com/duff92/image/upload/v1442181524/colors/c32020_000000.png',
      ELO_rating:[
        {name: 'Total', rating:1400},
        {name: 'Afasi', rating:1400},
        {name: 'ADHD, ADD, Damp', rating:1400},
        {name: 'Autism, autismspektrumtillstånd, asperger', rating:1400},
        {name: 'Dyslexi', rating:1400},
        {name: 'Dyskalkyli', rating:1400},
        {name: 'Utvecklingsstörning', rating:1400},
        {name: 'Diabetessynskada', rating:1400},
        {name: 'Grå starr, katarakt', rating:1400},
        {name: 'Grön starr, glaukom', rating:1400},
        {name: 'Åldersförändringar i gula fläcken, makuladegeneration', rating:1400},
        {name: 'Näthinneavlossning', rating:1400},
        {name: 'RP, retinitis pigmentosa', rating:1400},
        {name: 'Depression', rating:1400},
        {name: 'Bipolär sjukdom', rating:1400},
        {name: 'Schizofreni', rating:1400},
        {name: 'Tvångssyndrom, OCD', rating:1400},
        {name: 'Lässvårigheter', rating:1400},
        {name: 'Skrivsvårigheter', rating:1400},
        {name: 'Synnedsättning', rating:1400},
        {name: 'Fokusering', rating:1400},
        {name: 'Korttidsminne', rating:1400},
        {name: 'Organisera och planera', rating:1400},
        {name: 'Problemlösning', rating:1400},
        {name: 'Tidshantering', rating:1400}
      ],
      numOfVotes: 0,
      numOfTimesInTest: 0
    },
    {
      textcolor: '#ffffff',
      backcolor: '#000000',
      image_secureurl: 'https://res.cloudinary.com/duff92/image/upload/v1439564281/colors/ffffff_000000.png',
      ELO_rating:[
        {name: 'Total', rating:1400},
        {name: 'Afasi', rating:1400},
        {name: 'ADHD, ADD, Damp', rating:1400},
        {name: 'Autism, autismspektrumtillstånd, asperger', rating:1400},
        {name: 'Dyslexi', rating:1400},
        {name: 'Dyskalkyli', rating:1400},
        {name: 'Utvecklingsstörning', rating:1400},
        {name: 'Diabetessynskada', rating:1400},
        {name: 'Grå starr, katarakt', rating:1400},
        {name: 'Grön starr, glaukom', rating:1400},
        {name: 'Åldersförändringar i gula fläcken, makuladegeneration', rating:1400},
        {name: 'Näthinneavlossning', rating:1400},
        {name: 'RP, retinitis pigmentosa', rating:1400},
        {name: 'Depression', rating:1400},
        {name: 'Bipolär sjukdom', rating:1400},
        {name: 'Schizofreni', rating:1400},
        {name: 'Tvångssyndrom, OCD', rating:1400},
        {name: 'Lässvårigheter', rating:1400},
        {name: 'Skrivsvårigheter', rating:1400},
        {name: 'Synnedsättning', rating:1400},
        {name: 'Fokusering', rating:1400},
        {name: 'Korttidsminne', rating:1400},
        {name: 'Organisera och planera', rating:1400},
        {name: 'Problemlösning', rating:1400},
        {name: 'Tidshantering', rating:1400}
      ],
      numOfVotes: 0,
      numOfTimesInTest: 0
    }, function() {
      console.log('finished populating colorcombs');
    }
  );
});

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
