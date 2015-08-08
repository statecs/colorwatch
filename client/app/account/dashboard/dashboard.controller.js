'use strict';

angular.module('colorwatchApp')
  .controller('DashboardCtrl', function ($scope, Poll) {
      $scope.polls = Poll.query();
	});
