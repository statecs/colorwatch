'use strict';

angular.module('colorwatchApp')
  .controller('DashboardCtrl', function ($scope, socket, ColorCombs) {

    socket.on('vote', function(data){
          console.log('new vote', data);
          $scope.colors = data;
      });

      ColorCombs.getColorComb({id: 'list'}).$promise.then(function(colors){
        $scope.colors = colors;
        console.log('from database',colors);
      });
	});
