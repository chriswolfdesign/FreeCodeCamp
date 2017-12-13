
// When page is finished loading
$(document).ready(function () {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;

			// TODO: Change AJAX request to weather request 
			$.ajax({
				url: "https://talaikis.com/api/quotes/random/",
				async: true,
				cache: false,
				success: function(data) {
					console.log("AJAX request has been successful!");
					var quote = data.quote;
					$("body").html(quote);
				}
			});
		});
	}
});
