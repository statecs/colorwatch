'use strict';

angular.module('colorwatchApp')
  .directive('exportTable', function () {
    return {
      restrict: 'C',
      link: function (scope, elm) {
        scope.$on('export-pdf', function(){
          elm.tableExport({type:'pdf', escape:false});
        });
            scope.$on('export-excel', function(){
              elm.tableExport({type:'excel', escape:false});
          });
        scope.$on('export-doc', function(){
          elm.tableExport({type: 'doc', escape:false});
        });
        scope.$on('export-json', function(){
          elm.tableExport({type: 'json', escape:false});
        });
        scope.$on('export-csv', function(){
          elm.tableExport({type: 'csv', escape:false});
        });
      }
    };
  });