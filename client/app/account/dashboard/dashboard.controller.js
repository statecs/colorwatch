/**
 * Controller for the dashboard in the admin login page.
 */

'use strict';


angular.module('colorwatchApp')
  .controller('DashboardCtrl', function ($scope, socket, ColorCombs) {
    $scope.colors = null;
    $scope.numOfCompletedTests = 0;     //Number of completed tests in total made by users
    $scope.selectedDisability = undefined;
    $scope.disabilities = [{name:"Total"}];
    $scope.index = 0;
    $scope.titleOfDashboard;
    /**
     * Real-time update when new votes are received.
     */
    socket.on('vote', function(data){
      console.log('new vote', data);
      $scope.colors = data;
    });

    $scope.$watch('selectedDisability', function(newVal, oldVal){

      if(newVal !== oldVal){
        for (var i = 0; i < $scope.disabilities.length; i++) {
          if ($scope.disabilities[i].name === $scope.selectedDisability.name) {
            $scope.index = i;
            $scope.titleOfDashboard = $scope.selectedDisability.name;
          }
        }}
        else{
          $scope.index = 0;
        }
      });
    /**
     * Get all available color combinations from database.
     */
    ColorCombs.getColorComb({id: 'list'}).$promise.then(function(colors){
      $scope.colors = colors;
      $scope.disabilities = colors[0].ELO_rating;
      $scope.titleOfDashboard = "Total";
      var totalVotes = 0;

      for(var i = 0; i < colors.length; i++) {
        totalVotes += colors[i].numOfVotes;
      }
      $scope.numOfCompletedTests = totalVotes / 10;   //Divide by 10 (number of questions in test)
      console.log($scope.numOfCompletedTests);
      console.log('from database',colors);
    });



  });
