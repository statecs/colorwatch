'use strict';

angular.module('colorwatchApp')
.controller('TestCtrl', function ($scope, $rootScope, $routeParams, $location, TestRating) {
	   /**
      * total questions in the test
      * @type {Number}
      */
    $scope.totalQuestions = 10;
    /**
     * current question in the test, used also for activate current tab in pagination
     * @type {Number}
     */
    $scope.currentQuestion = parseInt($routeParams.questionNr);
    /**
     * number of pages per page, always set to 1 in this project
     * @type {Number}
     */
    $scope.itemsPerPage = 1;
    /**
     * Two images to choose between at current question
     * @type {Object}
     */
    $scope.twoImagesToChoose = TestRating.getCurrentQuestion($scope.currentQuestion-1);

    $scope.alt1ButtonText = 'Välj alternativ 1';
    $scope.alt2ButtonText = 'Välj alternativ 2';

    /**
     * When question changes in the pagination this method is called
     */
   $scope.questionChanged = function() {
     console.log('Question changed to: ' + $scope.currentQuestion);
     if($scope.currentQuestion > $scope.totalQuestions){
      $location.path('/oversikt');
     }
     else{
       $location.path('/test/' + $scope.currentQuestion);
       $scope.twoImagesToChoose = TestRating.getCurrentQuestion($scope.currentQuestion-1);
       console.log('TestImages',$scope.twoImagesToChoose);
     }
    };
    /**
     * [chooseImage description]
     * @param  {String} altChoosed - which alternative is choosed, eg 'Alt1' or 'Alt2'
     */
    $scope.chooseImage = function(altChoosed){
      var questionToChoose = $scope.currentQuestion;
      var scoreA = 0;
      var scoreB = 0;
      if(altChoosed === 'Alt1'){
        $scope.alt1ButtonText = 'Du har valt alterativ 1';
        scoreA = 1;
      }
      else{ 
        $scope.alt2ButtonText = 'Du har valt alterativ 2';
        scoreB = 1;
      }
      TestRating.setNewScore(questionToChoose-1, scoreA, scoreB);
      $scope.twoImagesToChoose.altChoosed = altChoosed;
    };
    /**
     * Changes class of button of selected color combination
     * @return {String} - the class for a button
     */
    $scope.selected = function(){
      if($scope.twoImagesToChoose.altChoosed === 'Alt1'){
        return 'btn btn-primary';
      }
      else{
        return 'btn btn-default';
      }
    };

  });