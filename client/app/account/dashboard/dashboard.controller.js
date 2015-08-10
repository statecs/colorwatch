'use strict';

angular.module('colorwatchApp')
  .controller('DashboardCtrl', function ($scope, ColorCombs) {
      ColorCombs.getColorComb({id: 'list'}).$promise.then(function(colors){
      	$scope.colors = colors;
      	console.log($scope.colors);
      });
	});
