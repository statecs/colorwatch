'use strict';

angular.module('colorwatchApp')
  .controller('FinalCtrl', function ($scope, $sessionStorage, $location, Poll, socket) {

    $scope.noDisabilities = false;
    $scope.noDiagnoses = false;

    $scope.disabilitiesModel = [
      {name: 'Lässvårigheter', state: false},
      {name: 'Skrivsvårigheter', state: false},
      {name: 'Synnedsättning', state: false},
      {name: 'Fokusering', state: false},
      {name: 'Minne', state: false},
      {name: 'Organisera och planera', state: false},
      {name: 'Problemlösning', state: false},
      {name: 'Tidshantering', state: false}
    ];

    $scope.diagnosesModel = [
      {name: 'Afasi', state: false},
      {name: 'ADHD, ADD, Damp', state: false},
      {name: 'Autism, autismspektrumtillstånd, asperger', state: false},
      {name: 'Dyslexi', state: false},
      {name: 'Dyskalkyli', state: false},
      {name: 'Utvecklingsstörning', state: false},
      {name: 'Diabetessynskada', state: false},
      {name: 'Grå starr, katarakt', state: false},
      {name: 'Grön starr, glaukom', state: false},
      {name: 'Gula fläcken', state: false},
      {name: 'Näthinneavlossning', state: false},
      {name: 'RP, retinitis pigmentosa', state: false},
      {name: 'Depression', state: false},
      {name: 'Bipolär sjukdom', state: false},
      {name: 'Schizofreni', state: false},
      {name: 'Tvångssyndrom, OCD', state: false}
    ];

    $scope.submit = function(){
      console.log("hej");
      var choosedDisabilities = [];   //Disabilites choosed by the user
      var choosedDiagnoses = [];      //Diagnoses choosed by the user

      //Filter out all choosen disabilities and diagnoses
      $.each($scope.disabilitiesModel, function(index, disability){
        if(disability.state){
          choosedDisabilities.push(disability.name);
        }
      });

      $.each($scope.diagnosesModel, function(index, diagnose){
        if(diagnose.state){
          choosedDiagnoses.push(diagnose.name);
        }
      });

   $scope.prevPage = function(){
       window.history.back();
    };
      //Update choices in database
      Poll.update({id: $sessionStorage.myTest}, {diagnoses: choosedDiagnoses, disabilities: choosedDisabilities},function(){

        //Send vote
        socket.emit('send:vote', {pollId: $sessionStorage.myTest});
        $location.path('/final-result');
      });

    };
  });
