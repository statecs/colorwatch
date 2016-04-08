'use strict';

angular.module('colorwatchApp')
  .controller('MainCtrl', function ($scope, $q, $http, $location, $rootScope) {
    $scope.descriptionText = 'Här följer tio enkla frågor på hur du uppfattar texter och färgers läsbarhet på webben. Detta för att kunna underlätta för Funka.nu att samla in relevant data kring färgkontraster. Du väljer den du tycker är bäst genom att klicka på respektive bild i formuläret. Uppskattad tid ca 10 min.';

   $rootScope.amt = 0;

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
