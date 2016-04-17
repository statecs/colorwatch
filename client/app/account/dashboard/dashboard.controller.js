/**
 * Controller for the dashboard in the admin login page.
 */

'use strict';


angular.module('colorwatchApp')
  .controller('DashboardCtrl', function ($scope, socket, $http) {
    $scope.colorCombs;
    $scope.totalNumOfTests = 0;
    /**
     * Real-time update when new votes are received.
     */
    socket.on('vote', function(data){
      $scope.colorCombs = data;
      $scope.totalNumOfTests = getNumOfTests($scope.colorCombs);
    });

    /**
     * Get all available color combinations from database.
     */
    $http.get('/api/colorcombs/list').then(function(res){
      $scope.colorCombs = res.data;
      $scope.totalNumOfTests = getNumOfTests($scope.colorCombs);
    });

    function getNumOfTests(data){
      var sum = 0;
      data.forEach(function(d){
        sum += d.totalNumOfVotes;
      });
      return sum / 10;
    }
  });
