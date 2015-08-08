'use strict';

angular.module('colorwatchApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
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
      'link': '/final-form'}];
    
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });