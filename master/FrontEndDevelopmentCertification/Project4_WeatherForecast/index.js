// Globals
var latitude;
var longitude;
var ajaxURL = "";
var celsiusTemperature;
var fahrenheitTemperature;
var isCelsius = true;

$(document).ready(function() {

	// retrieve geographical coordinates
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;

			ajaxURL = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude +
				 "&lon=" + longitude;

			// Retrieve weather information
			$.ajax({
				type: "GET",
				url: ajaxURL,
				async: true,
				cache: false,
				success: function(data) {
					$("#location").html("Current weather in " + data.name +
									    " is: ");
					$("#convert").html("Convert to Fahrenheit");
					celsiusTemperature = data.main.temp;
					fahrenheitTemperature = Math.floor(data.main.temp * (9/5) + 32);
					$("#temperature").html(celsiusTemperature + " &#8451");
					$("#weather-icon").html("<img src=" + data.weather[0].icon + "/>");

				}
			});
		});
	}

	// Button to convert between
	$("#convert").on("click", function() {
		if(isCelsius) {
			$("#temperature").html(fahrenheitTemperature + " &#8457");
			$("#convert").html("Convert to Celsius");
			isCelsius = false;
		} else {
			$("#temperature").html(celsiusTemperature + " &#8451");
			$("#convert").html("Convert to Fahrenheit");
			isCelsius = true;
		}
	});
});
