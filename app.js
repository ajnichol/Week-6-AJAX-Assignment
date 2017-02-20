$(document).ready(function() {
	//our topics array 
	var topics = ["tennis", "surfing", "hiking", "camping", "reading", "coding", "music", "concerts", "gaming", "movies"];

	function displayTopicsInfo() {

		var topicName = $(this).attr("data-name");
		//if our user adds a topic with spaces this function will format it for URLs
		topicName = encodeURI(topicName);
		//giphy api key
		var apiKey = "dc6zaTOxFJmzC";
		//api url
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topicName + "&limit=10&rating=pg&fmt=json&api_key=" + apiKey;
		//our ajax call method
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
				//retreiving the rating for each image from our api
				var rating = results[i].rating;
				//creating a paragraph element and setting its text to the rating of each image
				var displayRating = $("<p>").text("Rating: " + rating);
				//appending the paragraph element to the topicsDiv for display
				topicsDiv.append(displayRating);
				//retreiving the url for each image in our api
				var image = results[i].images.fixed_height_still.url;
				//creating an image element and setting its source to api's fixed_height_still image
				var topicImage = $("<img data-state='still' data-still='http://media1.giphy.com/media/xT8qBqIytkBbLjimru/200_s.gif' data-animate='http://media1.giphy.com/media/xT8qBqIytkBbLjimru/200.gif' class='gif'>").attr("src", image);
				//appending each image in our array to the topicDiv
				topicsDiv.append(topicImage);
				//prepending our images to the topicsImages div in our html
				$("#topicImages").prepend(topicsDiv);

			};

		});

	};

	function imageState() {

		var imageState = $("img").attr("data-state");

		if (imageState === "still") {
			$("img").attr("src", $("img").attr("data-animate"));
			$("img").attr("data-state", "animate");
		}
		else {
			$("img").attr("src", $("img").attr("data-still"));
			$("img").attr("data-state", "still");
		}
	};

	function topicsButtons() {
		//avoiding multiple button creation inside the topicButtons div
		$("#topicButtons").empty();
		//looping through our topics array to create and display a button for each topic
		for (var i=0; i < topics.length; i++) {
			//creating a button and storing it in a variable
			var button = $("<button>");
			//adding a class of topic to our button for later use
			button.addClass("topic");
			//grabbing the name value from each of our topics and setting them in the button
			button.attr("data-name", topics[i]);
			//adding the text of each of our topics array to the button
			button.text(topics[i]);
			//appending the button to the topicButtons div in our html
			$("#topicButtons").append(button);

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
	//event listener that using the imageState function as a delegate to change the image's state from still to animate
	$(document).on("click", ".gif", imageState);
	//event listener that using the displayTopicsInfo function as a delegate to display, when a topic is clicked, all the information we've requested from our api
	$(document).on("click", ".topic", displayTopicsInfo);
	//calling our topicsButtons fucntion to display the initial buttons from our array
	topicsButtons();

});