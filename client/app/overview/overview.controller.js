'use strict';

angular.module('colorwatchApp')
  .controller('OverviewCtrl', function ($scope, socket, Poll, $location) {
    $scope.overviewDescText = 'Här av du möjlighet att ändra dina val, tryck sedan fortsätt.';
   
    Poll.getPoll().$promise.then(function(poll){
      $scope.questions = poll;
    });

    $scope.update = function(){
      $location.path('/final-form')
    }

  });
