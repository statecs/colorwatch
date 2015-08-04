'use strict';

angular.module('colorwatchApp')
  .controller('OverviewCtrl', function ($scope, socket) {
    $scope.overviewDescText = 'Här av du möjlighet att ändra dina val, tryck sedan fortsätt.';
    $scope.choosedImages = null;
    $scope.$on('socket:myvote', function (ev, data) {
      console.log(data);
    });

    $scope.calculateELO = function(){
    	// EloRating.setELORating($scope.choosedImages);
    };
  });
