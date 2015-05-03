'use strict';

angular.module('colorwatchApp')
  .factory('EloRating', function ($resource) {

    var ratingList = [
      {
        'id': 1,
        'rating': 1400 
      },
      {
        'id': 2,
        'rating': 1400
      }];

    var kFactor = 32;

    return {
      setNewRatings: function(idColorA, idColorB, scoreA, scoreB){
        var expectedScoreA, expectedScoreB, newRatingA, newRatingB;

        var colorA = $.grep(ratingList, function(e){ return e.id == idColorA; })[0];
        var colorB = $.grep(ratingList, function(e){ return e.id == idColorB; })[0];
        
        expectedScoreA = 1 / (1 + Math.pow(10, (colorB.rating - colorA.rating) / 400));
        expectedScoreB = 1 / (1 + Math.pow(10, (colorA.rating - colorB.rating) / 400));
      
        newRatingA = colorA.rating + (kFactor * (scoreA - expectedScoreA));
        newRatingB = colorB.rating + (kFactor * (scoreB - expectedScoreB));
        
        colorA.rating = newRatingA;
        colorB.rating = newRatingB;
        console.log("new ratings", newRatingA, newRatingB);
      },
      getRatingList: function(){
        return ratingList;
      }
	  };
  });
