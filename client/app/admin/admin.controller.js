'use strict';

angular.module('colorwatchApp')
  .controller('AdminCtrl', function ($scope, $http, Poll) {
      
    $scope.polls = Poll.query();
  });
