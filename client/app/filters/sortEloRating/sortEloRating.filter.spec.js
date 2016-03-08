'use strict';

describe('Filter: sortEloRating', function () {

  // load the filter's module
  beforeEach(module('colorwatchApp'));

  // initialize a new instance of the filter before each test
  var sortEloRating;
  beforeEach(inject(function ($filter) {
    sortEloRating = $filter('sortEloRating');
  }));

  it('should return the input prefixed with "sortEloRating filter:"', function () {
    var text = 'angularjs';
  });

});
