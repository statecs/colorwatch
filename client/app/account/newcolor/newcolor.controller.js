'use strict';
var canvas, ctx;

function draw(textColor, backgroundColor) {
  console.log(textColor, backgroundColor);
  ctx.font="30px Comic Sans MS";
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.fillText("Hello World", canvas.width/2, canvas.height/2);
};
function blobToFile(theBlob, fileName){
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}

angular.module('colorwatchApp')
  .controller('NewcolorCtrl', function ($scope, ColorCombs, Upload, $location) {
    // Define an empty poll model object
    $scope.textcolor = "#ffffff";
    $scope.backcolor = "#000000";
    $scope.file = {};

    $scope.$watchCollection('[textcolor,backcolor]', function(val) {
      canvas = document.getElementById('myCanvas');
      ctx = canvas.getContext('2d');
      draw(val[0], val[1]);
    });

    $scope.createColor = function(){
      // var image = canvas.toDataURL("image/png");
      // console.log(document.write('<img src="'+image+'"/>'));

      if (canvas.toBlob) {
        canvas.toBlob(
          function (blob) {
            // Saves blobfile to a real file and upload to cloudinairy
            var theFile = blobToFile(blob, $scope.textcolor + $scope.backcolor + '.png');
            $scope.upload(theFile);
          },
          'image/png'
        );
      }
    };
    /**
     * Upload a image file to cloudinary
     * @param  {[type]} file image file
     * @return {[type]}      [description]
     */
    $scope.upload = function (file) {
      Upload.upload({
        url: 'https://api.cloudinary.com/v1_1/duff92/upload',
        fields: {upload_preset: 'zvesrhqn', tags: 'myphotoalbum', context:'photo='+$scope.textcolor+$scope.backcolor},
        file: file,
      }).progress(function (evt) {
        $scope.file.progress = parseInt(100.0 * evt.loaded / evt.total);
        console.log('Upload progress to cloudinary: ' + $scope.file.progress + '% ' + evt.config.file.name);
        $scope.file.status = "Uploading... " + $scope.file.progress + "%";
      }).success(function (data, status, headers, config) {
        console.log('file ' + config.file.name + 'uploaded. Response: ', data);
        $scope.file.result = data;
        ColorCombs.create({
          textcolor: $scope.textcolor,
          backcolor: $scope.backcolor,
          image_secureurl: data.secure_url,
          votes: []
        });
      }).error(function (data, status, headers, config) {
        $scope.file.errorStatus = {'error': 'error'};
        console.log('error status: ' + status, data);
      })
    };

    $scope.prevPage = function(){

      $location.path('/settings');
    }
  });
