'use strict';

angular.module('colorwatchApp')
  .controller('SettingsCtrl', function ($scope, ColorCombs, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    ColorCombs.getColorComb({id: 'list'}).$promise.then(function(colors){
      $scope.colors = colors;
      console.log($scope.colors);
    });
  });
