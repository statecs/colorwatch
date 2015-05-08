'use strict';

angular.module('colorwatchApp')
  .controller('FinalCtrl', function ($scope, $location) {

  	$scope.noDisabilities = false;
  	$scope.noDiagnoses = false;
  	
	$scope.disabilitiesModel = [
	   	{name: 'Lässvårigheter', state: false},
	   	{name: 'Skrivsvårigheter', state: false},
	   	{name: 'Synnedsättning', state: false},
	   	{name: 'Fokusering', state: false},
	   	{name: 'Korttidsminne', state: false},
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
	   	{name: 'Åldersförändringar i gula fläcken, makuladegeneration', state: false},
	   	{name: 'Näthinneavlossning', state: false},
	   	{name: 'RP, retinitis pigmentosa', state: false},
	   	{name: 'Depression', state: false},
	   	{name: 'Bipolär sjukdom', state: false},
	   	{name: 'Schizofreni', state: false},
	   	{name: 'Tvångssyndrom, OCD', state: false}
	 ];

	 $scope.submit = function(){
	 	$location.path('/final-result');
	 }
  });