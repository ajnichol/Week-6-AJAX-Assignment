$(document).ready(function() {
	//our topics array 
	var topics = ["tennis", "surfing", "hiking", "camping", "reading", "coding", "music", "concerts", "gaming", "movies"];

	function displayTopicsInfo() {
		//this is referring to our button that is calling the displayTopicsInfo function
		var topicName = $(this).attr("data-name");
		//if our user adds a topic with spaces this function will format it for urls
		topicName = encodeURI(topicName);
		//giphy api key
		var apiKey = "dc6zaTOxFJmzC";
		//api url
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topicName + "&limit=10&rating=pg&fmt=json&api_key=" + apiKey;
		//our ajax callback method
		$.ajax ({
			url:queryURL,
			method: "GET"
		}).done(function(response) {
			//setting and storing response data to a variable for resuse
			var results = response.data;
			//looping through our api's data to create and display several elements
			for(var i=0; i < results.length; i++) {
				//creating and storing a div with a class of topic
				var topicsDiv = $("<div class='topic'>");
				//letting our user know they can click to animate the gifs
				var user = $("<p> " + "Click To Animate" + "</p>");
				//appending our user variable to the topicsDiv
				topicsDiv.append(user);
				//retreiving the rating for each image from our api
				var rating = results[i].rating;
				//creating a paragraph element and setting its text to the rating of each image
				var displayRating = $("<p>").text("Rating: " + rating);
				//appending the paragraph element to the topicsDiv for display
				topicsDiv.append(displayRating);
				//retreiving the still url for each image in our api
				var image = results[i].images.fixed_height_still.url;
				//retreiving the animated url for each image in our api
				var animatedImage = results[i].images.fixed_height.url;
				//creating an image element and setting its source to api's fixed_height_still image
				var topicImage = $("<img data-state='still' data-still='" + image + "' data-animate='"+ animatedImage +"' class='gif'>").attr("src", image);
				//appending each image in our array to the topicDiv
				topicsDiv.append(topicImage);
				//prepending our images to the topicsImages div in our html
				$("#topicImages").prepend(topicsDiv);
				//event that calls our imageState function to display animated or still image 
				topicImage.on("click", imageState);

			};

		});

	};

	function imageState() {
		//this is referring to our image which is calling our imageState function
        var $this = $(this);
        //grabbing the the data-state value from the image and storing it in a variable
        var imageState = $this.attr("data-state");
        //checking if the value of our image is "still" then animate and set its state to animate else set its state to still and its value to still
        if (imageState === "still") {
           $this.attr("src", $this.attr("data-animate"));
           $this.attr("data-state", "animate");
        }
        else {
           $this.attr("src", $this.attr("data-still"));
           $this.attr("data-state", "still");
        }
    };

	function topicsButtons() {
		//avoiding multiple button creation inside the topicButtons div
		$("#topicButtons").empty();
		//looping through our topics array to create and display a button for each topic
		for (var i=0; i < topics.length; i++) {
			//creating a button and storing it in a variable
			var button = $("<button class='btn btn-small btn-primary'>");
			//adding a class of topic to our button for use in our event listener below
			button.addClass("topic");
			//adding a data attribute to the button for each topic in our array
			button.attr("data-name", topics[i]);
			//adding the text of each of our topics in the array to the button
			button.text(topics[i]);
			//appending the button to the topicButtons div in our html
			$("#topicButtons").append(button);
			//event that uses our displayTopicsInfo function as a delegate to display our data request from the api
			button.on("click", displayTopicsInfo);

		};
	};
	//this function will allow the user to create their own button to the topicButtons div in the html
	$("#addTopic").on("click", function(event) {
		//this jQuery function stops the submit button from submitting the users input
		event.preventDefault();
		//trimming the user input, grabbing the value the user enters, storing it in the id of topicInput, and storing it in a variable for reuse
		var newTopic = $("#topicInput").val().trim();
		//pushing the users input into our topics array
		topics.push(newTopic);
		//calling our function topicsButtons to create a new button
		topicsButtons();
	});
	//calling our topicsButtons function to display the initial buttons from our array
	topicsButtons();

});