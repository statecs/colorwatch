'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('colorwatchApp'));

  var MainCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have descriptiontext as type string', function () {
    //expect(scope.descriptionText).toEqual(jasmine.any(String));
  });
});
