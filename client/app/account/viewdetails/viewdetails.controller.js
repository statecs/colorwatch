/**
 * Controller for the dashboard in the admin login page.
 */

'use strict';


angular.module('colorwatchApp')
  .controller('ViewDetailsCtrl', function ($scope, socket, $http) {

    $scope.colors = [];
    var resultData = null;
    $scope.filteredOptions = [];
    $scope.numOfCompletedTests = 0;
    $scope.showResult = true;

    function updateTotalELOandVotes(colorA, colorB, scoreA, scoreB) {
      //Calculate ELO rating
      var kFactor = 32;

      var expectedScoreA = 1 / (1 + Math.pow(10, (colorB.totalRating - colorA.totalRating) / 400));
      var expectedScoreB = 1 / (1 + Math.pow(10, (colorA.totalRating - colorB.totalRating) / 400));

      colorA.totalRating += (kFactor * (scoreA - expectedScoreA));
      colorB.totalRating += (kFactor * (scoreB - expectedScoreB));

      //Update number of votes for this ratingobject
      if (scoreA === 1) { colorA.totalNumOfVotes++; }
      else { colorB.totalNumOfVotes++; }

      //Update number of times being shown in test for this raincoat
      colorA.totalNumOfTimesInTest++;
      colorB.totalNumOfTimesInTest++;
    }

    function filterRankingList(){
      //Reset rankinglist
      $scope.colors.forEach(function(d){
        d.totalRating = 1400;
        d.totalNumOfVotes = 0;
        d.totalNumOfTimesInTest = 0;
      });
      //console.log('init',$scope.colors[0].totalRating);
      //Loop through all results and update ELO rating
      var resultUsed = false;
      resultData.forEach(function(result){
        var useResult = true;
        $scope.filteredOptions.forEach(function(opt){

          var foundOpt = false;
          //Check if option is in disabilites for the result
          result.disabilities.forEach(function(disability){
            if(disability === opt){
              foundOpt = true;
            }
          });
          //Check if option is in diagnoses for the result
          result.diagnoses.forEach(function(diagnose){
            if(diagnose === opt){
              foundOpt = true;
            }
          });
          //If opt is not in either diagnoses or disabilities, do not use this result
          if(!foundOpt){
            useResult = false;
          }
        });
        if(useResult){
          //console.log('use result', $scope.filteredOptions, result);
          //console.log('before',$scope.colors[0].totalRating);
          for (var i = 0; i < result.questions.length; i++) {
            var scoreA = 0,
                scoreB = 0,
                colorA,
                colorB;

            //Find which colors used in the current question
            for (var j = 0; j < $scope.colors.length; j++) {
              if (result.questions[i].img1_url === $scope.colors[j].image_secureurl) {
                colorA = $scope.colors[j];
              }
              else if (result.questions[i].img2_url === $scope.colors[j].image_secureurl) {
                colorB = $scope.colors[j];
              }
            }
            //Set score depending on user choice
            if (result.questions[i].userVote === 'choice_alt1') {
              scoreA = 1;
            }
            else {
              scoreB = 1;
            }
            //Update total rating
            updateTotalELOandVotes(colorA, colorB, scoreA, scoreB);
          }
          //console.log('after',$scope.colors[0].totalRating);
          resultUsed = true;
        }
      });
      if(!resultUsed){
        $scope.showResult = false;
      }
      else{
        $scope.showResult = true;
      }
    }


    $scope.optionsModel = [
      {name: 'Lässvårigheter', state: false},
      {name: 'Skrivsvårigheter', state: false},
      {name: 'Synnedsättning', state: false},
      {name: 'Fokusering', state: false},
      {name: 'Minne', state: false},
      {name: 'Organisera och planera', state: false},
      {name: 'Problemlösning', state: false},
      {name: 'Tidshantering', state: false},
      {name: 'Afasi', state: false},
      {name: 'ADHD, ADD', state: false},
      {name: 'Asperger', state: false},
      {name: 'Autism', state: false},
      {name: 'Dyslexi', state: false},
      {name: 'Färgblind', state: false},
      {name: 'Grå starr', state: false},
      {name: 'Grön starr, glaukom', state: false},
      {name: 'Gula fläcken', state: false},
      {name: 'Näthinneavlossning', state: false},
      {name: 'Psykisk ohälsa', state: false},
      {name: 'RP, retinitis pigmentosa', state: false},
      {name: 'Utvecklingsstörning', state: false}
    ];
    $scope.filter = function(opt){
      var index = $scope.filteredOptions.indexOf(opt.name);
      if(index === -1){
        //Push options to filtered items
        $scope.filteredOptions.push(opt.name);
        filterRankingList();
        console.log($scope.colors);
      }
      else{
        $scope.filteredOptions.splice(index,1);
        filterRankingList();
        console.log($scope.colors);
      }
      if($scope.filteredOptions.length === 0){
        //Get total rating list when no filtered options is choosed
        $http.get('/api/colorcombs/list').then(function(res){
          $scope.colors = res.data;
          $scope.showResult = true;
        });
      }

    };
    /**
     * Get all available color combinations from database.
     */
    $http.get('/api/colorcombs/list').then(function(res){
      $scope.colors = res.data;
    });
    $http.get('/api/results/').then(function(res){
      resultData = res.data;
      $scope.numOfCompletedTests = resultData.length;
    });

    $scope.exportPdf = function(){
      $scope.$broadcast('export-pdf', {});
    };
    $scope.exportExcel = function(){
      $scope.$broadcast('export-excel', {});
    };
    $scope.exportJSON = function(){
      $scope.$broadcast('export-json', {});
    };
    $scope.exportCSV = function(){
      $scope.$broadcast('export-csv', {});
    };
  });
