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

angular.module('colorwatchApp')
  .controller('NewcolorCtrl', function ($scope, ColorCombs) {
      // Define an empty poll model object
		$scope.textcolor = "#ffffff";
		$scope.backcolor = "#000000";
		
		$scope.$watchCollection('[textcolor,backcolor]', function(val) {
	        canvas = document.getElementById('myCanvas');
			ctx = canvas.getContext('2d');
			draw(val[0], val[1]);
	    });		

	    $scope.createColor = function(){
	    	var img = canvas.toDataURL("image/png");
	    	console.log(img);
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
