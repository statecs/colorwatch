'use strict';

angular.module('colorwatchApp')
  .controller('MainCtrl', function ($scope, $rootScope) {
    $scope.descriptionText = 'Här följer tio enkla frågor på hur du uppfattar texter och färgers läsbarhet på webben. Detta för att kunna underlätta för Funka.nu att samla in relevant data kring färgkontraster. Du väljer den du tycker är bäst genom att klicka på respektive bild i formuläret. Uppskattad tid ca 10 min.';
    
    /**
     * initialize images to rate in test
     * @param  {Number} numQuestions - number of questions in test
     */
   /* $scope.initTest = function(numQuestions){
      var imagesToRate = TestRating.initTest(numQuestions);
      console.log('initialize test',imagesToRate);
    };*/

    /*$scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };*/
  });
