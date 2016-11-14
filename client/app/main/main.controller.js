'use strict';

angular.module('colorwatchApp')
  .controller('MainCtrl', function ($scope, $q, $http, $location, $rootScope) {
    $scope.descriptionText = 'Du kommer få svara på 10 frågor om vilka textfärger och bakgrundsfärger som är lättast för dig att läsa. Det tar runt 5 minuter. Tack för att du hjälper till!';

    /**
     * initialize images to rate in test
     * @param  {Number} numQuestions - number of questions in test
     */
    $scope.initTest = function(){
        $http.put('/api/polls/newpolls').then(function(){
          $rootScope.amt = 25;
          $location.path('/test/1');
        });
    };

  });
