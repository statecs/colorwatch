'use strict';

var _ = require('lodash');
var Colorcombs = require('./colorcombs.model');

// Get list of colorcombss
exports.index = function(req, res) {
  Colorcombs.find(function (err, colorcombss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(colorcombss);
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
      res.status(200).json(colors);
    }
  });
};

// Get a single colorcombs
exports.show = function(req, res) {
  Colorcombs.findById(req.params.id, function (err, colorcombs) {
    if(err) { return handleError(res, err); }
    if(!colorcombs) { return res.send(404); }
    res.contentType(colorcombs.image_contentType);
    return res.status(201).json(colorcombs.image_data);
  });
};

// Creates a new colorcombs in the DB.
exports.create = function(req, res) {
  var colorObj;
  colorObj = {
    textcolor: req.body.textcolor,
    backcolor: req.body.backcolor,
    image_secureurl: req.body.image_secureurl,
    totalRating: 1400,
    totalNumOfVotes: 0,
    totalNumOfTimesInTest: 0,
    ELO_rating:[
      {name: 'Övriga diagnoser', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Övriga svårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Afasi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'ADHD, ADD', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Asperger', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Autism', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Dyslexi', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Färgblind', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Grå starr', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Grön starr, glaukom', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Gula fläcken', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Näthinneavlossning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Psykisk ohälsa', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Utvecklingsstörning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Lässvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Skrivsvårigheter', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Synnedsättning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Fokusering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Minne', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Organisera och planera', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Problemlösning', rating:1400, numOfVotes: 0, numOfTimesInTest: 0},
      {name: 'Tidshantering', rating:1400, numOfVotes: 0, numOfTimesInTest: 0}
    ]
  };
  var color = new Colorcombs(colorObj);

  color.save(function(err, doc) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(doc);
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
      return res.status(200).json(colorcombs);
    });
  });
};


exports.destroyAll = function(req, res) {
  Colorcombs.remove({ }, function(err, result){
    if(!err) {
      return res.status(200).json(result);
    }
    else{
      return res.status(500).json(err);
    }
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
