'use strict';

angular.module('colorwatchApp')
  .controller('FinalCtrl', function ($scope, $cookies, $location, $http, socket, $rootScope) {

    $scope.noDisabilities = false;
    $scope.noDiagnoses = false;
    $scope.otherDiagnose = null;
    $scope.otherDisability = null;

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

    $scope.prevPage = function(){
      window.history.back();
    };

    $scope.submit = function(){
      $rootScope.amt = 100;
      var choosedDisabilities = [];   //Disabilites choosed by the user
      var choosedDiagnoses = [];      //Diagnoses choosed by the user

      //Filter out all choosen disabilities and diagnoses
      $.each($scope.disabilitiesModel, function(index, disability){
        if(disability.state){
          choosedDisabilities.push(disability.name);
        }
      });

      //If other disability is added
      if($scope.otherDisability){
        choosedDisabilities.push($scope.otherDisability);
      }

      $.each($scope.diagnosesModel, function(index, diagnose){
        if(diagnose.state){
          choosedDiagnoses.push(diagnose.name);
        }
      });

      //If other diagnose is added
      if($scope.otherDiagnose){
        choosedDiagnoses.push($scope.otherDiagnose);
      }
      $http.post('/api/results', {diagnoses: choosedDiagnoses, disabilities: choosedDisabilities}).then(function(res){
        socket.emit('send:vote', {data: res.data});
        $location.path('/final-result');
      });

    };
  });
