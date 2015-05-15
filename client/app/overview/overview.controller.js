'use strict';

angular.module('colorwatchApp')
  .controller('OverviewCtrl', function ($scope, TestRating) {
    $scope.overviewDescText = 'Här av du möjlighet att ändra dina val, tryck sedan fortsätt.';
    $scope.choosedImages = TestRating.getAllQuestions();
  });
