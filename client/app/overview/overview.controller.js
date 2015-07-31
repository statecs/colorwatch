'use strict';

angular.module('colorwatchApp')
  .controller('OverviewCtrl', function ($scope, TestRating, EloRating, socket) {
    $scope.overviewDescText = 'Här av du möjlighet att ändra dina val, tryck sedan fortsätt.';
    $scope.choosedImages = TestRating.getAllQuestions();
        $scope.$on('socket:myvote', function (ev, data) {
      console.log(data);
    });

    $scope.calculateELO = function(){
    	EloRating.setELORating($scope.choosedImages);
    };
  });
