$(document).ready(function() {

	var topics = ["tennis", "surfing", "hiking", "camping", "reading", "coding", "music", "concerts", "gaming", "movies"];

	function displayTopicsInfo() {

		var topicName = $(this).attr("data-name");
		//if our user adds a topic with spaces this function will format it for URLs
		topicName = encodeURI(topicName);
		//giphy api key
		var apiKey = "dc6zaTOxFJmzC";
		//api url
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topicName + "&limit=10&rating=pg&fmt=json&api_key=" + apiKey;

		$.ajax ({
			url:queryURL,
			method: "GET"
		}).done(function(response) {

			var results = response.data;

			for(var i=0; i < results.length; i++) {

				var topicsDiv = $("<div class='topic'>");
				var rating = results[i].rating;
				var displayRating = $("<p>").text("Rating: " + rating);
				topicsDiv.append(displayRating);
				var image = results[i].images.fixed_height_still.url;
				var topicImage = $("<img data-state='still' data-still='results.images.fixed_height_still' data-animate='results.images.fixed_height' class='gif'>").attr("src", image);
				topicsDiv.append(topicImage);
				$("#topicImages").prepend(topicsDiv);

			};

		});

	};

	function topicsButtons() {

		$("#topicButtons").empty();

		for (var i=0; i < topics.length; i++) {

			var button = $("<button>");
			button.addClass("topic");
			button.attr("data-name", topics[i]);
			button.text(topics[i]);
			$("#topicButtons").append(button);

		};
	};

	$("#addTopic").on("click", function(event) {

		event.preventDefault();
		var newTopic = $("#topicInput").val().trim();
		topics.push(newTopic);
		topicsButtons();
	});

	$(".gif").on("click", function() {

		var imageValue = $("img").attr("data-state");

		if (imageValue === "still") {
			$("img").attr("src", $("img").attr("data-animate"));
			$("img").attr("data-state", "animate");
		}
		else {
			$("img").attr("src", $("img").attr("data-still"));
			$("img").attr("data-state", "still");
		}
	});

	$(document).on("click", ".topic", displayTopicsInfo);
	
	topicsButtons();

});