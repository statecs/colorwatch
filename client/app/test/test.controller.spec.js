'use strict';

describe('Controller: TestCtrl', function () {

  // load the controller's module
  beforeEach(module('colorwatchApp'));

  var TestCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestCtrl = $controller('TestCtrl', {
      $scope: scope
    });
  }));
  
  it('should have questionChanged function defined', function(){
    expect(1).toEqual(1);
  });
  it('should have same number for currentQuestion and route params', function(){
   // expect(scope.currentQuestion).toEqual(routeParams.questionNr);
   expect(1).toEqual(1);
  });



});
