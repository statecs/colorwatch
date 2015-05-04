'use strict';

angular.module('colorwatchApp')
.controller('TestCtrl', function ($scope, $rootScope, $routeParams, $location, EloRating) {

    //Current used as placeholders, move later to questionChanged()
	
    $scope.totalQuestions = 10;
    $scope.currentQuestion = parseInt($routeParams.questionNr);
    $scope.itemsPerPage = 1;
    $scope.twoImagesToChoose = $rootScope.imagesToRate[$scope.currentQuestion-1];


   /**
   * @function 
   */
   $scope.questionChanged = function() {
     console.log('Question changed to: ' + $scope.currentQuestion);
     $location.path('/test/' + $scope.currentQuestion);
     $scope.twoImagesToChoose = $rootScope.imagesToRate[$scope.currentQuestion-1];
     console.log("TestImages",$rootScope.imagesToRate);
    };

    $scope.chooseImage = function(alt1Choosed){
      var idColorA = $scope.twoImagesToChoose.alt1.id;
      var idColorB = $scope.twoImagesToChoose.alt2.id;
      var scoreA = 0;
      var scoreB = 0;
      if(alt1Choosed){
        scoreA = 1;
      }
      else{
        scoreB = 1;
      }
      EloRating.setNewRatings(idColorA, idColorB, scoreA, scoreB);
      $scope.twoImagesToChoose.alt1Choosed = alt1Choosed;
    };

  });

/**
    * @function method for getting two unique randomized images
    * @return {Object} twoImagesToReturn- image1 is the first alternative, image2 is the second alternative
    */
    /*$scope.getTwoRandomImgSrc = function(){
      var twoImagesToReturn = chosenColorCombs[$scope.currentQuestion-1];
      console.log("if-statement: ", twoImagesToReturn);

      if(!twoImagesToReturn){
        console.log("Chosen colorCombs before",chosenColorCombs);
        var index1 = Math.floor(Math.random() * availableColorCombs.length);
        var index2 = Math.floor(Math.random() * availableColorCombs.length);
        console.log("indexes are " + index1 + " and " + index2);
        while (index1 == index2)
        {
         index2=Math.floor(Math.random()*3);
        }
        twoImagesToReturn = [availableColorCombs[index1], availableColorCombs[index2]];
        chosenColorCombs.push(twoImagesToReturn);
        console.log("Chosen colorCombs after",chosenColorCombs);
      }
      console.log("TwoImagesToReturn",twoImagesToReturn);
     return twoImagesToReturn;
   }*/