'use strict';

angular.module('colorwatchApp')
  .factory('TestRating', function ($cookieStore, ImagesToRate) {
    var imagesToRate = $cookieStore.get('imagesToRate');
    console.log('imagesToRate', imagesToRate);
    if(imagesToRate === undefined){
      imagesToRate = ImagesToRate.get(10);
      $cookieStore.put('imagesToRate', imagesToRate);
      console.log('No cookie for imagesToRate, new values are:', imagesToRate);
    }

    return {
      /**
       * initialize images for each question
       * @param  {Number} numQuestions - number of questions to pouplate images for
       * @return {Object} imagesToRate - An array with one object for each question
       */
      initTest: function(numQuestions){
        imagesToRate = ImagesToRate.get(numQuestions);
        $cookieStore.put('imagesToRate', imagesToRate);
        return imagesToRate;
      },
      /**
       * Set new score when user chooses one of the images in the test
       * @param {Number} questionNr - questionNumber to update information for
       * @param {Number} scoreA - Score for first alternative (1 or 0)
       * @param {Number} scoreB - Score for second alternative (1 or 0)
       */
      setNewScore: function(questionNr, scoreA, scoreB){
        if(scoreA === 1){
          imagesToRate[questionNr].altChoosed = 'Alt1';
        }
        else{
          imagesToRate[questionNr].altChoosed = 'Alt2';
        }
        $cookieStore.put('imagesToRate', imagesToRate);
        console.log('set new score', imagesToRate[questionNr].altChoosed);
      },
      /**
       * get images for current question
       * @param  {Number} questionNr - questionNumber to get images for
       * @return {Object} - Object with two images and one parameter of which image that is chosen
       */
      getCurrentQuestion: function(questionNr){
        return imagesToRate[questionNr];
      },
      /**
       * get all images in test
       * @return {Object} imagesToRate - all images in the test with info
       */
      getAllQuestions: function(){
        return imagesToRate;
      }
	  };
  });
