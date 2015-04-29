'use strict';

angular.module('colorwatchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/slut', {
        templateUrl: 'app/final/final.html',
        controller: 'FinalCtrl'
      });
  });
