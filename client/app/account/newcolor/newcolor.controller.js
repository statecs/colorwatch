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
  .controller('NewcolorCtrl', function ($scope, ColorCombs, Upload) {
      // Define an empty poll model object
		$scope.textcolor = "#ffffff";
		$scope.backcolor = "#000000";
		
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

	    	/*ColorCombs.create({}, {
	    		image_data: img, 
	    		textcolor: $scope.textcolor, 
	    		backcolor: $scope.backcolor, 
	    		image_contentType: 'image/png'
	    	});*/
	    };
	    /**
	     * Upload a image file to cloudinary
	     * @param  {[type]} file image file
	     * @return {[type]}      [description]
	     */
	    $scope.upload = function (file) {
	    	console.log($.cloudinary.config().upload_preset);
	        Upload.upload({
	            url: 'https://api.cloudinary.com/v1_1/duff92/upload',
	            fields: {upload_preset: 'zvesrhqn', tags: 'myphotoalbum', context:'photo='+$scope.textcolor+$scope.backcolor},
	            file: file,
	        }).progress(function (evt) {
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            console.log('Upload progress to cloudinary: ' + progressPercentage + '% ' + evt.config.file.name);
	        }).success(function (data, status, headers, config) {
	            console.log('file ' + config.file.name + 'uploaded. Response: ', data);
	        }).error(function (data, status, headers, config) {
	            console.log('error status: ' + status);
	        })
	    };
/*
		$scope.$watchCollection('[textcolor, backcolor]', function(newValue, oldValue){
			console.log('newValue', newValue);
			console.log('oldValue',oldValue);
			canvas = document.getElementById('myCanvas');
			if(canvas){
				console.log(canvas);
				ctx = canvas.getContext('2d');
			}
			else{
				console.log("no canvas");
			}
		}, true);*/
		/*// Method to add an additional choice option
		$scope.addChoice = function() {
			$scope.poll.choices.push({ text: '' });
		};
		
		// Validate and save the new poll to the database
		$scope.createPoll = function() {
			var poll = $scope.poll;
			
			// Check that a question was provided
			if(poll.question.length > 0) {
				var choiceCount = 0;
				
				// Loop through the choices, make sure at least two provided
				for(var i = 0, ln = poll.choices.length; i < ln; i++) {
					var choice = poll.choices[i];
					
					if(choice.text.length > 0) {
						choiceCount++
					}
				}
			
				if(choiceCount > 1) {
					// Create a new poll from the model
					var newPoll = new Poll(poll);
					
					// Call API to save poll to the database
					newPoll.$save(function(p, resp) {
						if(!p.error) {
							// If there is no error, redirect to the main view
							$location.path('polls');
						} else {
							alert('Could not create poll');
						}
					});
				} else {
					alert('You must enter at least two choices');
				}
			} else {
				alert('You must enter a question');
			}
		};*/
	});
