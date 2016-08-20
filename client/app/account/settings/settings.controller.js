'use strict';

angular.module('colorwatchApp')
  .controller('SettingsCtrl', function ($scope, $http, User, Auth, $window) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Lösenordet ändrat.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Fel lösenord';
          $scope.message = '';
        });
      }
		};

    $http.get('/api/colorcombs/list').then(function(res){
      var colors = res.data;
      $scope.colors = colors;
    });

    $scope.removeTest = function() {
      console.log('trying to remove test');

      var removeTest = $window.confirm('Är du säker på att du vill radera hela testet och ta bort all insamlad data?');
      if(removeTest) {
        $http.delete('/api/results/').then(function(res){
          console.log('Test removed', res);
        }, function(err) {
          console.log(err);
        });
        $http.delete('/api/colorcombs/').then(function(res) {
          console.log('colorcombs removed', res);
        }, function(err) {
          console.log(err);
        });
        location.reload();
      }
    };
    $scope.removeColor = function(colorId, index) {
      $http.delete('/api/colorcombs/' + colorId).then(function(){
        $scope.colors.splice(index,1);
      });
    };
  });
