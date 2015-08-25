'use strict';

angular.module('colorwatchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/test/:questionNr', {
        templateUrl: 'app/test/test.html',
        controller: 'TestCtrl',
        label: 'Test'
      });
  });
