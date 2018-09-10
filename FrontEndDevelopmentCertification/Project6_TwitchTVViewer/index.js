// Globals
var STREAMERS = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
	"storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "chriswolfdesign"];

// Main functionality
$(document).ready(function() {
	// Clear the streamers location
	$("#streamers").html("");

	// Load all streamers in the array
	allAJAX();

	// Click recognition
	$("#online").click(function() {
		$("#streamers").html("");
		STREAMERS.forEach(onlineAJAX);

		// Set online button to be active
		$("#online").css("background-color", "blue");
		$("#online").css("color", "white");

		// Set offline and all to be inactive
		$("#offline").css("background-color", "white");
		$("#offline").css("color", "black");

		$("#all").css("background-color", "white");
		$("#all").css("color", "black");
	});

	$("#offline").click(function() {
		$("#streamers").html("");
		STREAMERS.forEach(offlineAJAX);

		// Set offline button to be active
		$("#offline").css("background-color", "blue");
		$("#offline").css("color", "white");

		// Set online and all to be inactive
		$("#online").css("background-color", "white");
		$("#online").css("color", "black");

		$("#all").css("background-color", "white");
		$("#all").css("color", "black");
	});

	$("#all").click(function() {
		$("#streamers").html("");
		allAJAX();

		// Set all button to be active
		$("#all").css("background-color", "blue");
		$("#all").css("color", "white");

		// Set online and offline to be inactive
		$("#online").css("background-color", "white");
		$("#online").css("color", "black");

		$("#offline").css("background-color", "white");
		$("#offline").css("color", "black");
	});

	$("#text-field").keyup(function(event) {
		if(event.keyCode === 13) {
			$("#search").click();
		}
	});

	// When submit is clicked or enter is pressed
	$("#search").click(function() {
		var text = $("#text-field").val();
		text = text.replace(" ", "_");
		STREAMERS.push(text);
		$("#all").click();
	});
});

// Functions
function allAJAX() {
	STREAMERS.forEach(onlineAJAX);
	STREAMERS.forEach(offlineAJAX);
}

function onlineAJAX(item) {
	var twitchurl = "https://wind-bow.glitch.me/twitch-api/streams/" +
		item;
	$.ajax({
		url: twitchurl,
		dataType: "jsonp",
		data :{
			format: "json"
		},

		success: function(data) {
			if(data.stream != null) {
				$("<div/>", {
					class: "streamer online-streamer",
					id: item,
					text: item + " is currently streaming " + data.stream.game
				}).appendTo("#streamers");
				// $("#" + item).css("background-color", "green");
				$("#" + item).click(function() {
					window.location = "https://www.twitch.tv/" + item;
				});
			}
		}
	});
}

function offlineAJAX(item) {
	var twitchurl = "https://wind-bow.glitch.me/twitch-api/streams/" +
		item;
	$.ajax({
		url: twitchurl,
		dataType: "jsonp",
		data :{
			format: "json"
		},

		success: function(data) {
			if(data.stream === null) {
				$("<div/>", {
					class: "streamer offline-streamer",
					id: item,
					text: item + " is not currently streaming"
				}).appendTo("#streamers");

				// $("#" + item).css("background-color", "red");
				$("#" + item).click(function() {
					window.location = "https://www.twitch.tv/" + item;
				});
			}
		}
	});
}
