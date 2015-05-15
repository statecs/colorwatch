'use strict';

angular.module('colorwatchApp')
  .factory('ImagesToRate', function () {

    var _ratingList = [
      {
        'id': 1,
        'rating': 1400,
        'src': '/assets/images/color_blw.png'
      },
      {
        'id': 2,
        'rating': 1400,
        'src': '/assets/images/color_bw.png'
      },
      {
        'id': 3,
        'rating': 1400,
        'src': '/assets/images/color_by.png'
      },
      {
        'id': 4,
        'rating': 1400,
        'src': '/assets/images/color_gb.png'
      },
      {
        'id': 5,
        'rating': 1400,
        'src': '/assets/images/color_wb.png'
      },
      {
        'id': 6,
        'rating': 1400,
        'src': '/assets/images/color_wbl.png'
      },
      {
        'id': 7,
        'rating': 1400,
        'src': '/assets/images/color_wg.png'
      }];

    return {
      get: function(numQuestions){

        var selectedImages = [];
        function grepCallback(id) {
            return function(e) {
                return e.id === id; 
            };
        }
        for(var i = 0; i<numQuestions;i++){
          var index1 = Math.floor(Math.random() * _ratingList.length)+1;
          var index2 = Math.floor(Math.random() * _ratingList.length)+1;
          while (index1 === index2)
          {
           index2=Math.floor(Math.random()*_ratingList.length);
          }
          var colorA = $.grep(_ratingList, grepCallback(index1))[0];
          var colorB = $.grep(_ratingList, grepCallback(index2))[0];
          selectedImages.push({
            'alt1': {'id': colorA.id, 'src':colorA.src},
            'alt2': {'id': colorB.id, 'src':colorB.src},
            'altChoosed': null
          });
        };
        return selectedImages;
      }
    };
  });
