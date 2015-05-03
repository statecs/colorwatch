'use strict';

angular.module('colorwatchApp')
  .controller('TestCtrl', function ($scope) {
    $scope.message = 'Hello';
    $scope.currentImage1 = "assets/images/placeholder.png";

    $scope.currentImage2 = "assets/images/placeholder.png";

    $scope.totalItems = 10;
  	$scope.currentPage = 1;
  	$scope.itemsPerPage = 1;

  	$scope.pageChanged = function() {
    	console.log('Page changed to: ' + $scope.currentPage);
  	};
  });
