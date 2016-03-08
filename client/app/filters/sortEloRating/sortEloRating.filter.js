'use strict';

angular.module('colorwatchApp')
  .filter('sortEloRating', function () {
    return function(input, selectedIndex) {
      if(input !== null){
        return input.sort(function(a,b){
          // Make sure we are comparing integers
          var aValue = parseInt(a.ELO_rating[selectedIndex].rating);
          var bValue = parseInt(b.ELO_rating[selectedIndex].rating);
          // Do our custom test
          if (aValue  < bValue ) return 1;
          else if (aValue < bValue) return -1;
          else return 0;
        })
      }
    }
  });
