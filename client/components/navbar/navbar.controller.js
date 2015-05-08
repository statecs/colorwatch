'use strict';

angular.module('colorwatchApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Start',
      'link': '/'
    },
    { 'title': 'Test',
      'link': '/test/1'
    },
    { 'title': 'Översikt',
      'link': '/oversikt'
    },
    { 'title': 'Slut',
      'link': '/slut-form'}];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });