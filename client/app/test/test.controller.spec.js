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
  
  it('should load images for both color combinition choices', function(){});
  it('should load images for both color combinition choices', function(){});


});
