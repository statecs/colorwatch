/**
 * Controller for the dashboard in the admin login page.
 */

'use strict';


angular.module('colorwatchApp')
  .controller('DashboardCtrl', function ($scope, socket, $http) {
    $scope.colors = null;
    $scope.numOfCompletedTests = 0;     //Number of completed tests in total made by users
    $scope.selectedDisability = undefined;
    $scope.disabilities = '[{name:"Afasi"}]';
    $scope.index = 2;
    $scope.titleOfDashboard = null;
    var colorCombs;
    /**
     * Real-time update when new votes are received.
     */
    socket.on('vote', function(data){
      var totalVotes = 0;
      console.log(data);
      colorCombs = data;
      if($scope.colors !== null)
        $scope.colors = data;
      for(var i = 0; i < data.length; i++) {
        totalVotes += colorCombs[i].totalNumOfVotes;
      }
      $scope.numOfCompletedTests = totalVotes / 10;
    });

    $scope.$watch('selectedDisability', function(newVal, oldVal){
      if(newVal !== oldVal){
            $scope.colors = colorCombs;
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
    $http.get('/api/colorcombs/list').then(function(res){
      colorCombs = res.data;
      $scope.disabilities = colorCombs[0].ELO_rating;

      /*$scope.colors = colorCombs;
      $scope.titleOfDashboard = "Afasi";
    */
      var totalVotes = 0;
      for(var i = 0; i < colorCombs.length; i++) {
        totalVotes += colorCombs[i].totalNumOfVotes;
      }
      $scope.numOfCompletedTests = totalVotes / 10;   //Divide by 10 (number of questions in test)
    });


    $scope.exportPdf = function(){
      $scope.$broadcast('export-pdf', {});
    };
    $scope.exportExcel = function(){
      $scope.$broadcast('export-excel', {});
    };
    $scope.exportJSON = function(){
      $scope.$broadcast('export-json', {});
    };
    $scope.exportCSV = function(){
      $scope.$broadcast('export-csv', {});
    };
  });
