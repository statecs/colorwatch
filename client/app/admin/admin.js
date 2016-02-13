'use strict';

angular.module('colorwatchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
      redirectTo: '/login'
    });

  });
