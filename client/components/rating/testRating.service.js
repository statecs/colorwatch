'use strict';

angular.module('colorwatchApp')
  .factory('TestRating', function ($cookieStore, ImagesToRate) {
    var imagesToRate = $cookieStore.get('imagesToRate');
    console.log("imagesToRate", imagesToRate);
    if(imagesToRate === undefined){
      imagesToRate = ImagesToRate.get(10);
      $cookieStore.put('imagesToRate', imagesToRate);
      console.log("No cookie for imagesToRate, new values are:", imagesToRate);
    }

    return {
      /**
       * populates two unique images for each questiong
       * @param  {Number} numQuestions - number of questions to pouplate images for
       * @return {Object} selectedImages - An array with one object for each question
       */
      initTest: function(numQuestions){
        var imagesToRate = ImagesToRate.get(numQuestions);
        $cookieStore.put('imagesToRate', imagesToRate);
        return imagesToRate;
      },
      setNewScore: function(questionNr, scoreA, scoreB){
        if(scoreA == 1){
          imagesToRate[questionNr].altChoosed = 'Alt1';
        }
        else{
          imagesToRate[questionNr].altChoosed = 'Alt2';
        }
        $cookieStore.put('imagesToRate', imagesToRate);
        console.log('set new score', imagesToRate[questionNr].altChoosed);
      },
      getCurrentQuestion: function(questionNr){
        return imagesToRate[questionNr];
      },
      getAllQuestions: function(){
        return imagesToRate;
      }
	  };
  });
