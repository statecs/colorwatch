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

      $http.put('/api/polls/', {questionNr: $routeParams.questionNr, userVote: userChoice});

      if(nextQuestion > $scope.totalQuestions){
        $scope.nextPage();
      }
      else{
        $location.path('test/' + nextQuestion);
      }
    };
    /**
     * When question changes in the pagination this method is called
     */
   $scope.questionChanged = function() {
     console.log('Question changed to: ' + $scope.currentQuestion);
     $location.path('test/' + $scope.currentQuestion);
    };

    $scope.prevPage = function(){
       window.history.back();
    };


    $scope.nextPage = function(){
      var questionsNotAns = [];
      $.each($scope.polls, function(index, element){
        if(!element.userHasVoted){
          questionsNotAns.push(index+1);
        }
      });


  $scope.checkQuestion = function(){
        if(questionsNotAns.length == 0){

              $location.path('/oversikt');
          return false;
            }
            else{
              return true;
           //Need to add proper alert here to the user!
           console.log('Not answeared', questionsNotAns);

            }

         };
      }

  });
