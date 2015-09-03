'use strict';
var canvas, ctx;

function draw(textColor, backgroundColor) {
  console.log(textColor, backgroundColor);
  ctx.font="35px sans-serif";
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = textColor;
  ctx.textAlign = "start";
  ctx.fillText("Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. " +
    "Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare " +
    "tog att antalet bokstäver.", canvas.width/15, canvas.height/10);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

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

    $scope.$watchCollection('[textcolor,backcolor]', function() {
      canvas = document.getElementById('myCanvas');
      ctx = canvas.getContext('2d');

      var maxWidth = 600;
      var lineHeight = 85;
      var x = (canvas.width - maxWidth) / 2;
      var y = 125;

      ctx.fillStyle = $scope.backcolor;
      ctx.fillRect(0,0,canvas.width,canvas.height);

      var text = "Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. " +
      "Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare " +
      "tog att antalet bokstäver.";

      ctx.font = '36pt sans-serif';
      ctx.fillStyle = $scope.textcolor;

      wrapText(ctx, text, x, y, maxWidth, lineHeight);
      //draw(val[0], val[1]);
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
          image_secureurl: data.secure_url
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
