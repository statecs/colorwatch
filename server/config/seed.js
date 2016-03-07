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
        {name: 'Total', rating:1400, numOfVotes: 0, numOfTimesInTest: 5},
        {name: 'Afasi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'ADHD, ADD, Damp', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Autism, autismspektrumtillstånd, asperger', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyslexi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyskalkyli', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Utvecklingsstörning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Diabetessynskada', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grå starr, katarakt', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grön starr, glaukom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Gula fläcken', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Näthinneavlossning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'RP, retinitis pigmentosa', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Depression', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Bipolär sjukdom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Schizofreni', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tvångssyndrom, OCD', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Lässvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Skrivsvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Synnedsättning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Fokusering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Minne', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Organisera och planera', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Problemlösning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tidshantering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0}
      ]
    },
    {
      textcolor: '#ffffff',
      backcolor: '#000000',
      image_secureurl: 'https://res.cloudinary.com/duff92/image/upload/v1439564281/colors/ffffff_000000.png',
      ELO_rating:[
        {name: 'Total', rating:1400, numOfVotes: 0, numOfTimesInTest: 3},
        {name: 'Afasi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'ADHD, ADD, Damp', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Autism, autismspektrumtillstånd, asperger', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyslexi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyskalkyli', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Utvecklingsstörning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Diabetessynskada', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grå starr, katarakt', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grön starr, glaukom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Gula fläcken', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Näthinneavlossning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'RP, retinitis pigmentosa', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Depression', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Bipolär sjukdom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Schizofreni', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tvångssyndrom, OCD', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Lässvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Skrivsvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Synnedsättning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Fokusering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Minne', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Organisera och planera', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Problemlösning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tidshantering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0}
      ]
    },
    {
      textcolor: '#ceff00',
      backcolor: '#000000',
      image_secureurl: 'http://res.cloudinary.com/duff92/image/upload/v1457380097/colors/ceff00_000000.png',
      ELO_rating:[
        {name: 'Total', rating:1400, numOfVotes: 0, numOfTimesInTest: 5},
        {name: 'Afasi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'ADHD, ADD, Damp', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Autism, autismspektrumtillstånd, asperger', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyslexi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyskalkyli', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Utvecklingsstörning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Diabetessynskada', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grå starr, katarakt', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grön starr, glaukom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Gula fläcken', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Näthinneavlossning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'RP, retinitis pigmentosa', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Depression', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Bipolär sjukdom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Schizofreni', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tvångssyndrom, OCD', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Lässvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Skrivsvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Synnedsättning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Fokusering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Minne', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Organisera och planera', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Problemlösning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tidshantering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0}
      ]
    },
    {
      textcolor: '#001eff',
      backcolor: '#ffffff',
      image_secureurl: 'http://res.cloudinary.com/duff92/image/upload/v1457375265/colors/001eff_ffffff.png',
      ELO_rating:[
        {name: 'Total', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Afasi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'ADHD, ADD, Damp', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Autism, autismspektrumtillstånd, asperger', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyslexi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyskalkyli', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Utvecklingsstörning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Diabetessynskada', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grå starr, katarakt', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grön starr, glaukom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Gula fläcken', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Näthinneavlossning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'RP, retinitis pigmentosa', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Depression', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Bipolär sjukdom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Schizofreni', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tvångssyndrom, OCD', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Lässvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Skrivsvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Synnedsättning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Fokusering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Minne', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Organisera och planera', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Problemlösning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tidshantering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0}
      ]
    },
    {
      textcolor: '#e11414',
      backcolor: '#dfabab',
      image_secureurl: 'http://res.cloudinary.com/duff92/image/upload/v1456923338/colors/e11414_dfabab.png',
      ELO_rating:[
        {name: 'Total', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Afasi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'ADHD, ADD, Damp', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Autism, autismspektrumtillstånd, asperger', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyslexi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyskalkyli', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Utvecklingsstörning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Diabetessynskada', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grå starr, katarakt', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grön starr, glaukom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Gula fläcken', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Näthinneavlossning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'RP, retinitis pigmentosa', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Depression', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Bipolär sjukdom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Schizofreni', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tvångssyndrom, OCD', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Lässvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Skrivsvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Synnedsättning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Fokusering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Minne', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Organisera och planera', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Problemlösning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tidshantering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0}
      ]
    },
    {
      textcolor: '#000000',
      backcolor: '#ffffff',
      image_secureurl: 'http://res.cloudinary.com/duff92/image/upload/v1441296680/colors/000000_ffffff.png',
      ELO_rating:[
        {name: 'Total', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Afasi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'ADHD, ADD, Damp', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Autism, autismspektrumtillstånd, asperger', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyslexi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyskalkyli', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Utvecklingsstörning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Diabetessynskada', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grå starr, katarakt', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grön starr, glaukom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Gula fläcken', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Näthinneavlossning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'RP, retinitis pigmentosa', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Depression', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Bipolär sjukdom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Schizofreni', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tvångssyndrom, OCD', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Lässvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Skrivsvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Synnedsättning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Fokusering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Minne', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Organisera och planera', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Problemlösning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tidshantering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0}
      ]
    },
    {
      textcolor: '#ffffff',
      backcolor: '#2e7917',
      image_secureurl: 'http://res.cloudinary.com/duff92/image/upload/v1441230860/colors/ffffff_2e7917.png',
      ELO_rating:[
        {name: 'Total', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Afasi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'ADHD, ADD, Damp', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Autism, autismspektrumtillstånd, asperger', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyslexi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyskalkyli', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Utvecklingsstörning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Diabetessynskada', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grå starr, katarakt', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grön starr, glaukom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Gula fläcken', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Näthinneavlossning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'RP, retinitis pigmentosa', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Depression', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Bipolär sjukdom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Schizofreni', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tvångssyndrom, OCD', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Lässvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Skrivsvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Synnedsättning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Fokusering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Minne', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Organisera och planera', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Problemlösning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tidshantering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0}
      ]
    },
    {
      textcolor: '#0029ff',
      backcolor: '#f0ff00',
      image_secureurl: 'http://res.cloudinary.com/duff92/image/upload/v1457374971/colors/0029ff_f0ff00.png',
      ELO_rating:[
        {name: 'Total', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Afasi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'ADHD, ADD, Damp', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Autism, autismspektrumtillstånd, asperger', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyslexi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Dyskalkyli', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Utvecklingsstörning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Diabetessynskada', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grå starr, katarakt', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Grön starr, glaukom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Gula fläcken', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Näthinneavlossning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'RP, retinitis pigmentosa', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Depression', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Bipolär sjukdom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Schizofreni', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tvångssyndrom, OCD', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Lässvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Skrivsvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Synnedsättning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Fokusering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Minne', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Organisera och planera', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Problemlösning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
        {name: 'Tidshantering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0}
      ]
    }, function() {
      console.log('finished populating colorcombs2');
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
