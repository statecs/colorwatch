'use strict';

angular.module('colorwatchApp')
  .factory('EloRating', function ($resource) {

    var _ratingList = [
      {
        'id': 1,
        'rating': 1400,
        'src': "/assets/images/color_blw.png"
      },
      {
        'id': 2,
        'rating': 1400,
        'src': "/assets/images/color_bw.png"
      },
      {
        'id': 3,
        'rating': 1400,
        'src': "/assets/images/color_by.png"
      },
      {
        'id': 4,
        'rating': 1400,
        'src': "/assets/images/color_gb.png"
      },
      {
        'id': 5,
        'rating': 1400,
        'src': "/assets/images/color_wb.png"
      },
      {
        'id': 6,
        'rating': 1400,
        'src': "/assets/images/color_wbl.png"
      },
      {
        'id': 7,
        'rating': 1400,
        'src': "/assets/images/color_wg.png"
      }];

    var kFactor = 32;

    return {
      /**
       * initialize the ELO rating list for color combinations
       * @param  {Number} numItems - number of items to have in the rating list
       * @param  {Number} ratingPoint - initial rating point
       */
      initRatingList: function(numItems, ratingPoint) {
          _ratingList = [];
          for(var i = 1; i <= numItems; i++)
          {
            _ratingList.push({
              'id': i,
              'rating': ratingPoint
            });
          }
          //console.log("initRatingList with", ratingList);
      },
      /**
       * set new rating of two elements in the rating list
       * @param {Number} idColorA - id of first alternative color combination in the rating list
       * @param {Number} idColorB - id of second alternative color combination in the rating list
       * @param {Number} scoreA - score of first alternative, eg 1
       * @param {Number} scoreB - score of second alternative, eg 0
       */
      setNewRatings: function(idColorA, idColorB, scoreA, scoreB){
        var expectedScoreA, expectedScoreB, newRatingA, newRatingB;

        var colorA = $.grep(_ratingList, function(e){ return e.id == idColorA; })[0];
        var colorB = $.grep(_ratingList, function(e){ return e.id == idColorB; })[0];
        
        expectedScoreA = 1 / (1 + Math.pow(10, (colorB.rating - colorA.rating) / 400));
        expectedScoreB = 1 / (1 + Math.pow(10, (colorA.rating - colorB.rating) / 400));
      
        newRatingA = colorA.rating + (kFactor * (scoreA - expectedScoreA));
        newRatingB = colorB.rating + (kFactor * (scoreB - expectedScoreB));
        
        colorA.rating = newRatingA;
        colorB.rating = newRatingB;
        console.log("new ratings", newRatingA, newRatingB, _ratingList);
      },
      /**
       * get total ELO rating list
       * @return {Object} ratingList - total rating list
       */
      getRatingList: function(){
        return _ratingList;
      },
      /**
       * populates two unique images for each questiong
       * @param  {Number} numQuestions - number of questions to pouplate images for
       * @return {Object} selectedImages - An array with one object for each question
       */
      getImagesToRate: function(numQuestions){
        var selectedImages = [];
        for(var i = 0; i<numQuestions;i++){
          var index1 = Math.floor(Math.random() * _ratingList.length)+1;
          var index2 = Math.floor(Math.random() * _ratingList.length)+1;

          while (index1 == index2)
          {
           index2=Math.floor(Math.random()*_ratingList.length);
          }
          var colorA = $.grep(_ratingList, function(e){ return e.id == index1; })[0];
          var colorB = $.grep(_ratingList, function(e){ return e.id == index2; })[0];
          selectedImages.push({
            'alt1': {'id': colorA.id, 'src':colorA.src},
            'alt2': {'id': colorB.id, 'src':colorB.src},
            'altChoosed': null
          });
        }
        return selectedImages;
      }
	  };
  });
