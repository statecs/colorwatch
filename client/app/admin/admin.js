'use strict';

angular.module('colorwatchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        label: 'Admin'
      })
      .when('/new', {
        templateUrl: 'app/admin/new_poll.html',
        controller: 'PollNewCtrl'
      });

  });