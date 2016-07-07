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

    $scope.prevPage = function(){
      window.history.back();
    };

    $scope.myFunc = function(){
      disabilitiesModel.state();
    };

    $scope.disabilityCount = 0;
    $scope.disabilityCheck = function(disability, noDisabilities, otherDisability){
      if(disability.state || $scope.noDisabilities == true) {
        $scope.disabilityCount--;//opposite
      } else if ($scope.otherDisability){
          $scope.disabilityCount = 1;
        } else{
        $scope.disabilityCount++;
      }
    };

    $scope.diagnosesCount = 0;
    $scope.diagnosesCheck = function(diagnose, noDiagnoses, otherDiagnose){
      if(diagnose.state || $scope.noDiagnoses == true) {
        $scope.diagnosesCount--;//opposite
      } else if ($scope.otherDisability){
          $scope.diagnosesCount = 1;
        } else{
        $scope.diagnosesCount++;
      }
    };

    $scope.submit = function(){

      if ($scope.disabilityCount != 0 && $scope.diagnosesCount != 0) {
        
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
      }
      

    };
  });

    // Adding as directive.
angular.module('colorwatchApp')
.directive('input', ['$interval', function($interval) {
    return {
      restrict: 'E', // It restricts that the directive will only be a HTML element (tag name), not an attribute.
      link: function(scope, elm, attr) {
        if (attr.type === 'checkbox') {
          elm.on('keypress', function(event) {
            var keyCode = (event.keyCode ? event.keyCode : event.which);
            if (keyCode === 13) {
              event.preventDefault(); // only when enter key is pressed.
              elm.trigger('click');
              scope.$apply();
            }
          });
        }
      }
    };
  }
]);
