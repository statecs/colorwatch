'use strict';

angular.module('colorwatchApp')
  .controller('TestCtrl', function ($scope, $routeParams, $location, EloRating) {

    //Current used as placeholders, move later to questionChanged()
	$scope.currentImage1 = "https://s3.eu-central-1.amazonaws.com/colorwatch/color-images-test/image3.png?_ts=" + new Date().getTime();
    $scope.currentImage2 = "https://s3.eu-central-1.amazonaws.com/colorwatch/color-images-test/image1.png";

    $scope.totalQuestions = 10;
  	$scope.currentQuestion = $routeParams.questionNr;
  	$scope.itemsPerPage = 1;

  	$scope.questionChanged = function() {
    	console.log('Question changed to: ' + $scope.currentQuestion);
    	$location.path('/test/' + $scope.currentQuestion);
    	if($scope.currentQuestion == 2){
    		console.log("Set new image src from: " + $scope.currentImage1);

    		$scope.currentImage1 = "https://s3.eu-central-1.amazonaws.com/colorwatch/color-images-test/image2.png?_ts=" + new Date().getTime();

    		console.log("Set new image src to: " + $scope.currentImage1);
    	}
  	};

  	$scope.setQuestion = function (questionNr) {	
  		console.log("Set questionNr to " + questionNr);
    	$scope.currentQuestion = questionNr;
  	};

  	//console.log("Elorating before",EloRating.getRatingList());
  	EloRating.initRatingList(10, 1400);
  	EloRating.setNewRatings(1,2,1,0);
	EloRating.setNewRatings(2,3,1,0);
	EloRating.setNewRatings(3,4,1,0);
  	EloRating.setNewRatings(4,5,1,0);
	EloRating.setNewRatings(5,6,1,0);
	EloRating.setNewRatings(6,7,1,0);
  	EloRating.setNewRatings(7,8,1,0);
	EloRating.setNewRatings(9,10,1,0);
	EloRating.setNewRatings(4,9,1,0);
  	EloRating.setNewRatings(3,1,1,0);
	
	
  	//console.log("Elorating after",EloRating.getRatingList());

  });
