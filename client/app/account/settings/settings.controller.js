'use strict';

angular.module('colorwatchApp')
  .controller('SettingsCtrl', function ($scope, $http, User, Auth) {
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

    $http.get('/api/colorcombs/list').then(function(res){
      var colors = res.data;
      $scope.colors = colors;
    });

    $scope.removeColor = function(colorId, index) {
      $http.delete('/api/colorcombs/' + colorId).then(function(){
        $scope.colors.splice(index,1);
      });
    };
  });
