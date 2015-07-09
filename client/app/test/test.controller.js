'use strict';

angular.module('colorwatchApp')
.controller('TestCtrl', function ($scope, $rootScope, $routeParams, $location, TestRating, Poll, socket) {
    $scope.$on('socket:error', function (ev, data) {
      console.log("error");
    });
    
    socket.forward('myvote', $scope);
    $scope.$on('socket:myvote', function (ev, data) {
      console.log(data);
    });

    $scope.polls = Poll.query().$promise.then(function(polls){
  	   console.log(polls);
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
      console.log("currentQuestion", $scope.currentQuestion);
      Poll.get({pollId: polls[$scope.currentQuestion-1]._id}).$promise.then(function(data){
        $scope.poll = data;
        console.log("scope.poll", $scope.poll);
      });

    });

    $scope.vote = function(choiceId){
      var pollId = $scope.poll._id;
    
      if(choiceId) {
        var voteObj = { pollId: pollId, choice: choiceId };
        console.log("vote: ", voteObj, " with socket: ", socket);
        socket.emit('send:vote', voteObj);
        // socket.emit('news', voteObj);
      } else {
        alert('You must select an option to vote for');
      }
    }

    /**
     * When question changes in the pagination this method is called
     */
   $scope.questionChanged = function() {
     console.log('Question changed to: ' + $scope.currentQuestion);

     if($scope.currentQuestion > $scope.totalQuestions){
      $location.path('/oversikt');
     }
     else{
       $location.path('/test/' + $scope.currentQuestion);
      // console.log('TestImages',$scope.twoImagesToChoose);
     }
    };
    /**
     * [chooseImage description]
     * @param  {String} altChoosed - which alternative is choosed, eg 'Alt1' or 'Alt2'
     */
    $scope.chooseImage = function(altChoosed){
      var questionToChoose = $scope.currentQuestion;
      var scoreA = 0;
      var scoreB = 0;
    };
  });