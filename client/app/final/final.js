'use strict';

angular.module('colorwatchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/final-form', {
        templateUrl: 'app/final/final-form.html',
        controller: 'FinalCtrl'
      })
      .when('/final-result', {
        templateUrl: 'app/final/final.html',
        controller: 'FinalCtrl'
      });
  });
