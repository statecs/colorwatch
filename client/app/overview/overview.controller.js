'use strict';

angular.module('colorwatchApp')
  .controller('OverviewCtrl', function ($scope, Poll, $location, $sessionStorage) {
    $scope.overviewDescText = 'Här av du möjlighet att ändra dina val, tryck sedan fortsätt.';
   	
    Poll.getPoll({id: $sessionStorage.myTest}).$promise.then(function(questions){
      $scope.questions = questions;
      console.log(questions);
    });
    

    $scope.vote = function(userChoice, questionNr){
      $scope.questions[questionNr-1].userVote = userChoice;
      Poll.update({id: $sessionStorage.myTest}, {questionNr: questionNr, userVote: userChoice});
    }

    $scope.prevPage = function(){
    	$location.path('/test/1');
    }

    $scope.nextPage = function(){
      $location.path('/final-form')
    }

  });
