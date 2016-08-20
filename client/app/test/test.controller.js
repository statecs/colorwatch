'use strict';

angular.module('colorwatchApp')
  .controller('TestCtrl', function ($scope, $routeParams, $location, $http, $window) {

    $scope.loading = true;
    $scope.poll = {};

    $scope.totalQuestions = 10;
    $scope.currentQuestion = 0;
    $scope.value = 0;
    var valueProgress = 0.2;
    $scope.maxval = 1.2;
    $http.get('/api/polls/').then(function(res){
      $scope.polls = res.data;
      /**
       * total questions in the test
       * @type {Number}
       */
      $scope.totalQuestions = res.data.length;
      /**
       * current question in the test, used also for activate current tab in pagination
       * @type {Number}
       */
      $scope.currentQuestion = $routeParams.questionNr || 1;
      $scope.value = valueProgress + $scope.currentQuestion / $scope.totalQuestions;
      /**
       * number of pages per page, always set to 1 in this project
       * @type {Number}
       */
      $scope.itemsPerPage = 1;
      /**
       * Two images to choose between at current question
       * @type {Object}
       */
      $scope.poll = res.data[$routeParams.questionNr-1 || 0];
    }).finally(function(){
      $scope.loading = false;
    });

    $scope.vote = function(userChoice){
      $scope.poll.userVote = userChoice;
      $scope.poll.userHasVoted = true;

      var nextQuestion = parseInt($routeParams.questionNr) + 1;

      $http.put('/api/polls/', {questionNr: $routeParams.questionNr, userVote: userChoice}).then(function(){
        if(nextQuestion > $scope.totalQuestions){
          $scope.nextPage();
        }
        else{
          $location.path('test/' + nextQuestion);
        }
      });

    };

    $scope.nextPage = function(){
      $scope.currentQuestion = $scope.progressValue;
      $http.get('/api/polls/').then(function(res){
        res.data.forEach(function(element){
          if(!element.userHasVoted){
            console.log('Not answeared', element);
            return;
          }
        });
        $window.scrollTo(0,0); //Scroll to top to show the alert message
        $location.path('/oversikt');
      });
    }

  });
