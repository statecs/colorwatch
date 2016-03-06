'use strict';

describe('Directive: exportTable', function () {

  // load the directive's module
  beforeEach(module('colorwatchApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<export-table></export-table>');
    element = $compile(element)(scope);
  }));
});
