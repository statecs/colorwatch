'use strict';

angular.module('colorwatchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/oversikt', {
        templateUrl: 'app/overview/overview.html',
        controller: 'OverviewCtrl',
        label: 'Overview'
      });
  });
