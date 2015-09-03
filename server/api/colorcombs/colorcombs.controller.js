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
  var colorObj = {
    textcolor: req.body.textcolor,
    backcolor: req.body.backcolor,
    image_secureurl: req.body.image_secureurl,
    ELO_rating: 1400,
    numOfVotes: 0
  };
  console.log(colorObj);
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
