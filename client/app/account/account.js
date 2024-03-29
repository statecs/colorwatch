'use strict';

angular.module('colorwatchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup-2016-!funka', {
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/viewdetails', {
        templateUrl: 'app/account/viewdetails/viewdetails.html',
        controller: 'ViewDetailsCtrl',
        authenticate: true
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/newcolor', {
        templateUrl: 'app/account/newcolor/newcolor.html',
        controller: 'NewcolorCtrl',
        authenticate: true
      });
  });
