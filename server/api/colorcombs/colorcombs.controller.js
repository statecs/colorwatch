'use strict';

var _ = require('lodash');
var Colorcombs = require('./colorcombs.model');

// Get list of colorcombss
exports.index = function(req, res) {
  Colorcombs.find(function (err, colorcombss) {
    if(err) { return handleError(res, err); }
    return res.json(200, colorcombss);
  });
};

// JSON API for list of colorcombs
//
exports.list = function(req, res) {
  // Query Mongo for polls, just get back the question text
  //

  Colorcombs.find({}, function(error, colors) {
    if(error){
      throw 'Error in list';
    }
    else{
      res.json(colors);
    }
  });
};

// Get a single colorcombs
exports.show = function(req, res) {
  Colorcombs.findById(req.params.id, function (err, colorcombs) {
    if(err) { return handleError(res, err); }
    if(!colorcombs) { return res.send(404); }
    res.contentType(colorcombs.image_contentType);
    return res.json(201, colorcombs.image_data);
  });
};

// Creates a new colorcombs in the DB.
exports.create = function(req, res) {
  var colorObj;
  colorObj = {
    textcolor: req.body.textcolor,
    backcolor: req.body.backcolor,
    image_secureurl: req.body.image_secureurl,
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
  };
  var color = new Colorcombs(colorObj);

  color.save(function(err, doc) {
    if(err) { return handleError(res, err); }
    return res.json(201, doc);
  });
};

// Updates an existing colorcombs in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Colorcombs.findById(req.params.id, function (err, colorcombs) {
    if (err) { return handleError(res, err); }
    if(!colorcombs) { return res.send(404); }
    var updated = _.merge(colorcombs, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, colorcombs);
    });
  });
};

// Deletes a colorcombs from the DB.
exports.destroy = function(req, res) {
  Colorcombs.findById(req.params.id, function (err, colorcombs) {
    if(err) { return handleError(res, err); }
    if(!colorcombs) { return res.send(404); }
    colorcombs.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
