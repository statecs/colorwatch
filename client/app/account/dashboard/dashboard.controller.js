'use strict';

angular.module('colorwatchApp')
  .controller('DashboardCtrl', function ($scope, socket, ColorCombs) {
    $scope.colors = null;
    $scope.numOfCompletedTests = 0;

    socket.on('vote', function(data){
      console.log('new vote', data);
      $scope.colors = data;
    });

    ColorCombs.getColorComb({id: 'list'}).$promise.then(function(colors){
      $scope.colors = colors;
      var totalVotes = 0;
      for(var i = 0; i < colors.length; i++) {
        totalVotes += colors[i].numOfVotes;
      }
      $scope.numOfCompletedTests = totalVotes / 10;
      console.log($scope.numOfCompletedTests);
      console.log('from database',colors);
    });
  });
