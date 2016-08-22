'use strict';

angular.module('colorwatchApp')
  .controller('FinalCtrl', function ($scope, $cookies, $location, $http, socket) {

    $scope.noDisabilities  = false;
    $scope.noDiagnoses     = false;
    $scope.otherDiagnose   = null;
    $scope.otherDisability = null;

    $scope.disabilitiesSelected = false;
    $scope.diagnosesSelected = false;

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

    $scope.prevPage = function () {
      window.history.back();
    };

    $scope.checkDisabilities = function () {
      $scope.disabilitiesSelected = false;

      if ($scope.noDisabilities) {
        $scope.disabilitiesModel.forEach(function (item) {
          item.state = false;
        });
        $scope.otherDisability = null;
        $scope.disabilitiesSelected = true;
        $scope.errorDisability = '';
      }
      else{

      }
      if ($scope.otherDisability) {
        $scope.disabilitiesSelected = true;
        $scope.errorDisability = '';
      }
      $scope.disabilitiesModel.forEach(function (disability) {
        if (disability.state) {
          $scope.disabilitiesSelected = true;
          $scope.errorDisability = '';
        }
      });

    };

    $scope.checkDiagnoses = function () {
      $scope.diagnosesSelected = false;

      if ($scope.noDiagnoses) {
        $scope.diagnosesModel.forEach(function (item) {
          item.state = false;
        });
        $scope.otherDiagnose = null;
        $scope.diagnosesSelected = true;
        $scope.errorDiagnose = '';
      }
      if ($scope.otherDiagnose) {
        $scope.diagnosesSelected = true;
        $scope.errorDiagnose = '';
      }
      $scope.diagnosesModel.forEach(function (diagnose) {
        if (diagnose.state) {
          $scope.diagnosesSelected = true;
          $scope.errorDiagnose = '';
        }
      });
    };

    $scope.submit = function () {
      var choosedDisabilities = [];   //Disabilites choosed by the user
      var choosedDiagnoses = [];      //Diagnoses choosed by the user

      if ($scope.disabilitiesSelected && $scope.diagnosesSelected) {
        if ($scope.otherDiagnose) {
          choosedDiagnoses.push($scope.otherDiagnose);
        }
        $scope.diagnosesModel.forEach(function (diagnose) {
          if (diagnose.state) {
            choosedDiagnoses.push(diagnose.name);
          }
        });

        if ($scope.otherDisability) {
          choosedDisabilities.push($scope.otherDisability);
        }
        $scope.disabilitiesModel.forEach(function (disability) {
          if (disability.state) {
            choosedDisabilities.push(disability.name);
          }
        });

        $http.post('/api/results', {
          diagnoses: choosedDiagnoses,
          disabilities: choosedDisabilities
        }).then(function successCallback(res) {
          socket.emit('send:vote', {data: res.data});
          $location.path('/final-result');
        }, function errorCallback(err) {
          console.log(err);
        });
      }
      else if($scope.disabilitiesSelected && !$scope.diagnosesSelected) {
        $scope.errorDiagnose = 'Var god välj minst en diagnos';
      }
      else {
        $scope.errorDisability = 'Var god välj minst en svårighet';
      }


    };
  });

// Adding as directive.
angular.module('colorwatchApp')
  .directive('input', ['$interval', function () {
    return {
      restrict: 'E', // It restricts that the directive will only be a HTML element (tag name), not an attribute.
      link: function (scope, elm, attr) {
        if (attr.type === 'checkbox') {
          elm.on('keypress', function (event) {
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
