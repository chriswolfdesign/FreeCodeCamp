// Constants
var color = 0;
var colors = ["blue", "green", "red", "purple"];
var quote = "";
var author = "";
var message = "";

// Activate the page
$(document).ready(function () {

    // Load the page with a default color and first quote
    $.ajax({
        type: "GET",
        url: "https://talaikis.com/api/quotes/random/",
        async: true,
        cache: false,
        success: function(data) {
            quote = data.quote;
            author = data.author;
            message = "\"" + quote + "\" - " + author;
            $("#quote").html("<h4>\"" + data.quote +
                "\"</h4>");
            $("#author").html("<h4>- " + data.author + "</h4>");
        }
    });

    // Set our button to the correct colors
    $(".btn").css("background", colors[color]);
    $(".btn").css("color", "white");

    // Get a new quote
    $("#new-quote").on("click", function() {
        if(color === colors.length - 1) {
            color = 0;
        }
        else {
            color++;
        }

        $("body").css("background-color", colors[color]);
        $("#typing-space").css("color", colors[color]);
        $(".btn").css("background", colors[color]);

        // Request quote from talaikis
        $.ajax({
            url: "https://talaikis.com/api/quotes/random/",
            async: true,
            cache: false,
            success: function(data) {
                quote = data.quote;
                author = data.author;
                $("#quote").html("<h4>\"" + quote +
                    "\"</h4>");
                $("#author").html("<h4>- " + author + "</h4>");
                message = "\"" + quote + "\" - " + author;
            }
        });
    });

    // Post the current quote onto Twitter
    $("#twitter-button").on("click", function() {
        var tweetMessage = message;

        if(tweetMessage.length > 140) {
            alert("Tweet is longer than 140 characters.  It will be truncated.");
            tweetMessage = tweetMessage.substring(0, 140);
        }

        var tweetLink = "http://twitter.com/home?status=" + tweetMessage;
        window.open(tweetLink, "_blank");

    });

    // Post the current quote onto Tumblr
    // BUG: Tumblr will open post but does not include text
    $("#tumblr-button").on("click", function() {
        tumblrMessage = message;

        if(tumblrMessage.length > 500) {
            alert("Post is longer than 500 characters.  It will be truncated.");
            tumblrMessage = tumblrMessage.substring(0, 500);
        }

        var tumblrLink = "https://www.tumblr.com/new/text"
        window.open(tumblrLink, "_blank");
    });

    // Post the current quote onto Facebook
    // BUG: Facebook will open post but does not include text
    $("#facebook-button").on("click", function () {
        var facebookMessage = message;

        var facebookLink = "http://www.facebook.com/";

        window.open(facebookLink, "_blank");
    })
});
