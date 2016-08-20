'use strict';

angular.module('colorwatchApp')
  .controller('OverviewCtrl', function ($scope, $location, $http, $rootScope, $window) {
    $scope.overviewDescText = 'Här av du möjlighet att ändra dina val, tryck sedan fortsätt.';

    $http.get('/api/polls').then(function(res){
      $scope.questions = res.data;
    });

    $scope.vote = function(userChoice, questionNr){
      $scope.questions[questionNr-1].userVote = userChoice;
      $http.put('/api/polls/',{questionNr: questionNr, userVote: userChoice});
    };

    $scope.prevPage = function(){
    	$location.path('/test/1');
    };

     $rootScope.amt = 55;
    $scope.nextPage = function(){
      $rootScope.amt = 75;
      $window.scrollTo(0,0); //Scroll to top to show the alert message
      $location.path('/final-form')
    };


  });
