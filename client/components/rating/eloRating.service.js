'use strict';

angular.module('colorwatchApp')
  .factory('EloRating', function () {

  	//Duplicated so far, need to make better solution
    var _ratingList = [
      {
        'id': 1,
        'rating': 1400,
        'src': '/assets/images/color_blw.png'
      },
      {
        'id': 2,
        'rating': 1400,
        'src': '/assets/images/color_bw.png'
      },
      {
        'id': 3,
        'rating': 1400,
        'src': '/assets/images/color_by.png'
      },
      {
        'id': 4,
        'rating': 1400,
        'src': '/assets/images/color_gb.png'
      },
      {
        'id': 5,
        'rating': 1400,
        'src': '/assets/images/color_wb.png'
      },
      {
        'id': 6,
        'rating': 1400,
        'src': '/assets/images/color_wbl.png'
      },
      {
        'id': 7,
        'rating': 1400,
        'src': '/assets/images/color_wg.png'
      }];

  	var kFactor = 32;
    /**
     * [grepRatingList description]
     * @param  {Number} id [description]
     * @return {Array}    [description]
     */
    function grepRatingList(id){
      return $.grep(_ratingList, function(e){ return e.id === id; })[0];
    }
    return {
          /**
           * method for calculating the ELO rating based on user choices
           * @param {Object} imagesToRate - Array with all the data from test
           */
	      	setELORating: function(imagesToRate){
	        	var expectedScoreA, expectedScoreB, newRatingA, newRatingB, scoreA, scoreB;
	      		for(var i = 0; i < imagesToRate.length;i++){
              scoreA = 0;
              scoreB = 0;
              if(imagesToRate[i].altChoosen === 'Alt1'){
                scoreA = 1;
              }
              else{
                scoreB = 1;
              }
			        var colorA = grepRatingList(imagesToRate[i].alt1.id);
			        var colorB = grepRatingList(imagesToRate[i].alt2.id);
              
			        expectedScoreA = 1 / (1 + Math.pow(10, (colorB.rating - colorA.rating) / 400));
			        expectedScoreB = 1 / (1 + Math.pow(10, (colorA.rating - colorB.rating) / 400));
			        
			        newRatingA = colorA.rating + (kFactor * (scoreA - expectedScoreA));
			        newRatingB = colorB.rating + (kFactor * (scoreB - expectedScoreB));
			      
			        colorA.rating = newRatingA;
			        colorB.rating = newRatingB;
	        		
	        		console.log('new ratings', newRatingA, newRatingB, _ratingList);
	      		}
	      	}
	  };
  });
