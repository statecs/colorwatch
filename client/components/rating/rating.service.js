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
      /**
      * @function initialize the ELO rating list for color combinations
      * @param {number} numItems - number of items to have in the rating list
      * @param {number} ratingPoint - initial rating point
      */
      initRatingList: function(numItems, ratingPoint) {
          ratingList = [];
          for(var i = 1; i <= numItems; i++)
          {
            ratingList.push({
              'id': i,
              'rating': ratingPoint
            });
          }
          //console.log("initRatingList with", ratingList);
      },
      /**
      * @function set new rating of two elements in the rating list
      * @param {number} idColorA - id of first alternative color combination in the rating list
      * @param {number} idColorB - id of second alternative color combination in the rating list
      * @param {number} scoreA - score of first alternative, eg 1
      * @param {number} scoreB - score of second alternative, eg 0
      */
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
        console.log("new ratings", newRatingA, newRatingB, ratingList);
      },
      /**
      * @function get total ELO rating list
      * @return {Array} ratingList - total rating list
      */
      getRatingList: function(){
        return ratingList;
      },
      getSortedRatingList: function(){
        return
      }
	  };
  });
