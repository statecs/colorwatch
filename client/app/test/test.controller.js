'use strict';

angular.module('colorwatchApp')
.controller('TestCtrl', function ($scope, $rootScope, $routeParams, $location, Poll, ColorCombs, $sessionStorage) {
    /*$scope.$on('socket:error', function (ev, data) {
      console.log("error");
    });
    
    socket.forward('myvote', $scope);
    $scope.$on('socket:myvote', function (ev, data) {
      console.log(data);
    });*/

    console.log('sessionStorage',$sessionStorage.myTest);
    $scope.poll = {};
    Poll.getPoll({id: $sessionStorage.myTest},{}).$promise.then(function(polls){
      
       $scope.polls = polls;
       /**
        * total questions in the test
        * @type {Number}
        */
      $scope.totalQuestions = polls.length;
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
      /*console.log("currentQuestion", $scope.currentQuestion);
      Poll.get({pollId: polls[$scope.currentQuestion-1]._id}).$promise.then(function(data){
        $scope.poll = data;
        console.log("scope.poll", $scope.poll);
      });*/
      $scope.poll = polls[$routeParams.questionNr-1 || 0];
      /*Poll.get({pollId: polls[$scope.currentQuestion-1]._id}).$promise.then(function(data){
        $scope.poll = data;
      });*/
    });

    $scope.vote = function(userChoice){
      $scope.poll.userVote = userChoice;
      $scope.poll.userHasVoted = true;
      var nextQuestion = parseInt($routeParams.questionNr) + 1;

      Poll.update({id: $sessionStorage.myTest}, {questionNr: $routeParams.questionNr, userVote: userChoice});
      
      if(nextQuestion > $scope.totalQuestions){
        $scope.nextPage();
      }
      else{
        $location.path('test/' + nextQuestion);
      }
    }
    /**
     * When question changes in the pagination this method is called
     */
   $scope.questionChanged = function() {
     console.log('Question changed to: ' + $scope.currentQuestion);
     $location.path('test/' + $scope.currentQuestion);
    };

    $scope.prevPage = function(){
      $location.path('/');
    }


    $scope.nextPage = function(){
      var questionsNotAns = [];
      $.each($scope.polls, function(index, element){
        if(!element.userHasVoted){
          questionsNotAns.push(index+1);
        }
      });
      if(questionsNotAns.length != 0){
          //Need to add proper alert here to the user!
          console.log('Not answeared', questionsNotAns);
      }
      else{
        $location.path('/oversikt');
      }
    }
  });