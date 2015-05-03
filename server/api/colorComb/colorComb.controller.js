'use strict';

var _ = require('lodash');
var ColorComb = require('./colorComb.model');

// Get list of colorCombs
exports.index = function(req, res) {
  ColorComb.find(function (err, colorCombs) {
    if(err) { return handleError(res, err); }
    return res.json(200, colorCombs);
  });
};

// Get a single colorComb
exports.show = function(req, res) {
  ColorComb.findById(req.params.id, function (err, colorComb) {
    if(err) { return handleError(res, err); }
    if(!colorComb) { return res.send(404); }
    return res.json(colorComb);
  });
};

// Creates a new colorComb in the DB.
exports.create = function(req, res) {
  ColorComb.create(req.body, function(err, colorComb) {
    if(err) { return handleError(res, err); }
    return res.json(201, colorComb);
  });
};

// Updates an existing colorComb in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ColorComb.findById(req.params.id, function (err, colorComb) {
    if (err) { return handleError(res, err); }
    if(!colorComb) { return res.send(404); }
    var updated = _.merge(colorComb, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, colorComb);
    });
  });
};

// Deletes a colorComb from the DB.
exports.destroy = function(req, res) {
  ColorComb.findById(req.params.id, function (err, colorComb) {
    if(err) { return handleError(res, err); }
    if(!colorComb) { return res.send(404); }
    colorComb.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}