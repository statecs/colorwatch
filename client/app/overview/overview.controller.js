'use strict';

angular.module('colorwatchApp')
  .controller('OverviewCtrl', function ($scope, $rootScope) {
    $scope.overviewDescText = "Här av du möjlighet att ändra dina val, tryck sedan fortsätt."
    $scope.choosedImages = $rootScope.imagesToRate;
  });
