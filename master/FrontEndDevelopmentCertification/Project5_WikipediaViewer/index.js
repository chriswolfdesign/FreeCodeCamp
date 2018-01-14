// Globals
var query;
var ajaxurl;

// Main functionality
$(document).ready(function() {

    // If user tries to submit information in #text-field using enter
    $("#text-field").keyup(function(event) {
        if(event.keyCode === 13) {
            $("#submit").click();
        }
    });

    $("#submit").on("click", function() {
        query = $("#text-field").val();
        $("#title").html("Search results for: " + query);
        query = query.replace(" ", "_");

        ajaxurl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + query + "&format=json&origin=*";

        var html = "";
        // Reach out to Wikipedia API
        $.ajax({
            dataType: "json",
            url: ajaxurl,
            contentType: "application/json; charset=utf-8",
            async: true,
            cache: false,
            success: function(data) {
                for(entry in data[1]) {
                    // Add the link to the wikipedia article
                    html += "<div class=\"link\"><a href=\"" + data[3][entry] + "\"</a>" +
                        data[1][entry] + "</div>";

                    // Add the description of the wikipedia article if available
                    // else, declare that there is no descriptor
                    if(data[2][entry] != "") {
                        html += "<div class=\"descriptor\">" + data[2][entry] + "</div>";
                    } else {
                        html += "<div class=\"descriptor\">No Description provided by Wikipedia" +
                            "</div>";
                    }

                    // Add a break in the page for organization
                    html += "<br />"
                }

                // Add the html to the webpage
                $("#links").html(html);
            }
        });

        $("#or-option").html("<br />");
        $("#text-field").val("");
    });
});
