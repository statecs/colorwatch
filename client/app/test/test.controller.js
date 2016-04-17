'use strict';

angular.module('colorwatchApp')
  .controller('TestCtrl', function ($scope, $rootScope, $routeParams, $location, $http) {

    $scope.loading = true;
    $scope.poll = {};
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

      $rootScope.amt += 3;

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
      $http.get('/api/polls/').then(function(res){
        res.data.forEach(function(element){
          if(!element.userHasVoted){
            console.log('Not answeared', element);
            return;
          }
        });
        $location.path('/oversikt');
      });
    }

  });
