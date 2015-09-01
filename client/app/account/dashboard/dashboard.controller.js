'use strict';

angular.module('colorwatchApp')
  .controller('DashboardCtrl', function ($scope, socket) {
      socket.on('vote', function(data){
        console.log(data);
        $scope.colors = data;
      });
	});
