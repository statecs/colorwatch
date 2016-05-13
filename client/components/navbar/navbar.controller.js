'use strict';

angular.module('colorwatchApp')
  .controller('NavbarCtrl', function ($rootScope, $scope, $location, Auth, $timeout) {
  
  $rootScope.countFrom = 0;
  
  $timeout(function(){
    $rootScope.progressValue = $scope.currentQuestion;
  }, 200);

    $scope.menu = [{
      'title': 'Start',
      'link': '/',
      'active': true
    },
    { 'title': 'Test',
      'link': '/test/1',
      'active': true
    },
    { 'title': 'Översikt',
      'link': '/oversikt',
      'active': true
    },
    { 'title': 'Slut',
      'link': '/final-form',
      'active': false}];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
