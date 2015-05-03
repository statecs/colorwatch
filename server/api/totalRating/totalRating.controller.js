'use strict';

var _ = require('lodash');
var TotalRating = require('./totalRating.model');

// Get list of totalRatings
exports.index = function(req, res) {
  TotalRating.find(function (err, totalRatings) {
    if(err) { return handleError(res, err); }
    return res.json(200, totalRatings);
  });
};

// Get a single totalRating
exports.show = function(req, res) {
  TotalRating.findById(req.params.id, function (err, totalRating) {
    if(err) { return handleError(res, err); }
    if(!totalRating) { return res.send(404); }
    return res.json(totalRating);
  });
};

// Creates a new totalRating in the DB.
exports.create = function(req, res) {
  TotalRating.create(req.body, function(err, totalRating) {
    if(err) { return handleError(res, err); }
    return res.json(201, totalRating);
  });
};

// Updates an existing totalRating in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  TotalRating.findById(req.params.id, function (err, totalRating) {
    if (err) { return handleError(res, err); }
    if(!totalRating) { return res.send(404); }
    var updated = _.merge(totalRating, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, totalRating);
    });
  });
};

// Deletes a totalRating from the DB.
exports.destroy = function(req, res) {
  TotalRating.findById(req.params.id, function (err, totalRating) {
    if(err) { return handleError(res, err); }
    if(!totalRating) { return res.send(404); }
    totalRating.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}