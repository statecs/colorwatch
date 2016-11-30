'use strict';

var _ = require('lodash');
var Colorcombs = require('./colorcombs.model');
var mongoose = require('mongoose');

function objectFindKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === value) {
      return i;
    }
  }
  return -1;
}

/*
 * Updates the ELO rating for a single object and the number of votes and times in test
 * INPUT:
 * - ratingObjectA: first ratingobject from a single poll
 * - ratingObjectB: second ratingobject from a single poll
 * - scoreA: 1 if ratingObjectA is the choosen, otherwise 0
 * - scoreB: same as for scoraA but for ratingObjectB
 * */
function updateELOandVotes(ratingObjectA, ratingObjectB, scoreA, scoreB) {
  //Calculate ELO rating
  var kFactor = 32;

  var expectedScoreA = 1 / (1 + Math.pow(10, (ratingObjectB.rating - ratingObjectA.rating) / 400));
  var expectedScoreB = 1 / (1 + Math.pow(10, (ratingObjectA.rating - ratingObjectB.rating) / 400));

  ratingObjectA.rating += (kFactor * (scoreA - expectedScoreA));
  ratingObjectB.rating += (kFactor * (scoreB - expectedScoreB));

  //Update number of votes for this ratingobject
  if (scoreA === 1) ratingObjectA.numOfVotes++;
  else ratingObjectB.numOfVotes++;

  //Update number of times being shown in test for this raincoat
  ratingObjectA.numOfTimesInTest++;
  ratingObjectB.numOfTimesInTest++;
}
function updateTotalELOandVotes(colorA, colorB, scoreA, scoreB) {
  //Calculate ELO rating
  var kFactor = 32;

  var expectedScoreA = 1 / (1 + Math.pow(10, (colorB.totalRating - colorA.totalRating) / 400));
  var expectedScoreB = 1 / (1 + Math.pow(10, (colorA.totalRating - colorB.totalRating) / 400));

  colorA.totalRating += (kFactor * (scoreA - expectedScoreA));
  colorB.totalRating += (kFactor * (scoreB - expectedScoreB));

  //Update number of votes for this ratingobject
  if (scoreA === 1) colorA.totalNumOfVotes++;
  else colorB.totalNumOfVotes++;

  //Update number of times being shown in test for this raincoat
  colorA.totalNumOfTimesInTest++;
  colorB.totalNumOfTimesInTest++;
}

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

exports.updateRatings = function(req, res) {
  var otherDiagnoseIndex = 0,
    otherDisabilitiyIndex = 1;

  var colorA, colorB, scoreA, scoreB, indexELO;

  //First find all colors in test
  Colorcombs.find(req.body.questions, function (err, colors) {
    //Loop through all questions in poll to update ELO rating
    for (var i = 0; i < req.body.questions.length; i++) {
      scoreA = 0;
      scoreB = 0;

      //Find which colors used in the current question
      for (var j = 0; j < colors.length; j++) {
        //console.log(mongoose.Types.ObjectId(req.body.questions[i].img1), mongoose.Types.ObjectId(req.body.questions[i].img2), colors[j]._id);

        if (mongoose.Types.ObjectId(req.body.questions[i].img1).equals(colors[j]._id)) {
          colorA = colors[j];
          //console.log('color A equals');
        }
        else if (mongoose.Types.ObjectId(req.body.questions[i].img2).equals(colors[j]._id)) {
          colorB = colors[j];
          // console.log('color B equals');
        }
      }
      //Set score depending on user choice
      if (req.body.questions[i].userVote === 'choice_alt1') {
        scoreA = 1;
      }
      else {
        scoreB = 1;
      }

      var k;
      //Updating ELO rating for the chosen disabilities
      for (k = 0; k < req.body.disabilities.length; k++) {
        //console.log(colorA);
        indexELO = objectFindKey(colorA.ELO_rating, 'name', req.body.disabilities[k]);
        if (indexELO !== -1) {
          updateELOandVotes(colorA.ELO_rating[indexELO], colorB.ELO_rating[indexELO], scoreA, scoreB);
        }
        else if (indexELO === -1 && req.body.disabilities[k].length !== 0) {
          updateELOandVotes(colorA.ELO_rating[otherDisabilitiyIndex], colorB.ELO_rating[otherDisabilitiyIndex], scoreA, scoreB);
        }
        else {
          console.log("Couldn't update ELO rating for disabilities");
        }
      }

      //Updating ELO rating for the chosen diagnoses
      for (k = 0; k < req.body.diagnoses.length; k++) {
        indexELO = objectFindKey(colorA.ELO_rating, 'name', req.body.diagnoses[k]);
        if (indexELO !== -1) {
          // console.log('updateELO');
          updateELOandVotes(colorA.ELO_rating[indexELO], colorB.ELO_rating[indexELO], scoreA, scoreB);
        }
        else if (indexELO === -1 && req.body.diagnoses[k].length !== 0) {
          updateELOandVotes(colorA.ELO_rating[otherDiagnoseIndex], colorB.ELO_rating[otherDiagnoseIndex], scoreA, scoreB);
        }
        else {
          console.log("Couldn't update ELO rating for diagnoses");
        }
      }
      //Update total rating, index 0 indicates total
      updateTotalELOandVotes(colorA, colorB, scoreA, scoreB);
    }
    // Save ratings to DB
    colors.forEach(function (color, index, array) {
      color.save(function (err) {
        if (err) {
          throw 'Error in save ratings';
        }
        if (index === array.length - 1) {
          Colorcombs.find(function (err, colors) {
            if (err) {
              throw 'Error in finding all colorcombs';
            }
          });
        }
      });
    });
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
