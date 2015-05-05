'use strict';

angular.module('colorwatchApp')
.controller('TestCtrl', function ($scope, $rootScope, $routeParams, $location, EloRating) {
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
    $scope.twoImagesToChoose = $rootScope.imagesToRate[$scope.currentQuestion-1];

    /**
     * When question changes in the pagination this method is called
     */
   $scope.questionChanged = function() {
     console.log('Question changed to: ' + $scope.currentQuestion);
     $location.path('/test/' + $scope.currentQuestion);
     $scope.twoImagesToChoose = $rootScope.imagesToRate[$scope.currentQuestion-1];
     console.log("TestImages",$rootScope.imagesToRate);
    };
    /**
     * [chooseImage description]
     * @param  {String} altChoosed - which alternative is choosed, eg 'Alt1' or 'Alt2'
     */
    $scope.chooseImage = function(altChoosed){
      var idColorA = $scope.twoImagesToChoose.alt1.id;
      var idColorB = $scope.twoImagesToChoose.alt2.id;
      var scoreA = 0;
      var scoreB = 0;
      if(altChoosed == 'Alt1'){
        scoreA = 1;
      }
      else{
        scoreB = 1;
      }
      EloRating.setNewRatings(idColorA, idColorB, scoreA, scoreB);
      $scope.twoImagesToChoose.altChoosed = altChoosed;
    };
    /**
     * Changes class of button of selected color combination
     * @return {String} - the class for a button
     */
    $scope.selected = function(){
      if($scope.twoImagesToChoose.altChoosed == 'Alt1'){
        return "btn btn-primary btn-lg";
      }
      else{
        return "btn btn-default btn-lg";
      }
    }

  });