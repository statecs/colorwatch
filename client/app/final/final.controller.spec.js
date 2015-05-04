'use strict';

describe('Controller: FinalCtrl', function () {

  // load the controller's module
  beforeEach(module('colorwatchApp'));

  var FinalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FinalCtrl = $controller('FinalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
