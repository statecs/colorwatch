/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /Results              ->  index
 * POST    /Results              ->  create
 * GET     /Results/:id          ->  show
 * PUT     /Results/:id          ->  update
 * DELETE  /Results/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Result = require('./result.model');

// Get list of Results
exports.index = function(req, res) {
  Result.find(function (err, Results) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(Results);
  });
};

// Get a single Result
exports.show = function(req, res) {
  Result.findById(req.params.id, function (err, Result) {
    if(err) { return handleError(res, err); }
    if(!Result) { return res.send(404); }
    return res.json(Result);
  });
};

// Creates a new Result in the DB.
exports.create = function(req, res) {
  var result = new Result({
    disabilities: req.body.disabilities,
    diagnoses: req.body.diagnoses,
    questions: req.session.questions
  });

  result.save(function(err, doc) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(doc);
  });
};

// Updates an existing Result in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Result.findById(req.params.id, function (err, Result) {
    if (err) { return handleError(res, err); }
    if(!Result) { return res.send(404); }
    var updated = _.merge(Result, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(Results);
    });
  });
};

// Deletes a Result from the DB.
exports.destroy = function(req, res) {
  Result.findById(req.params.id, function (err, Result) {
    if(err) { return handleError(res, err); }
    if(!Result) { return res.send(404); }
    Result.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
