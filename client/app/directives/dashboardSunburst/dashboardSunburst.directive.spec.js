'use strict';

describe('Directive: dashboardSunburst', function () {

  // load the directive's module and view
  beforeEach(module('colorwatchApp'));
  beforeEach(module('app/directives/dashboardSunburst/dashboardSunburst.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dashboard-sunburst></dashboard-sunburst>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the dashboardSunburst directive');
  }));
});
