/**
 * Controller for the dashboard in the admin login page.
 */

'use strict';


angular.module('colorwatchApp')
  .controller('DashboardCtrl', function ($scope, socket, $http) {
    $scope.colorCombs;
    /**
     * Real-time update when new votes are received.
     */
    socket.on('vote', function(data){
      console.log(data);
      $scope.colorCombs = data;
      });

    /**
     * Get all available color combinations from database.
     */
    $http.get('/api/colorcombs/list').then(function(res){
      $scope.colorCombs = res.data;
      var colorCombs = res.data;
        $scope.colors = colorCombs;
      $scope.disabilities = colorCombs[0].ELO_rating;
      $scope.disabilitiesModel = $scope.disabilities;

    });

  });
