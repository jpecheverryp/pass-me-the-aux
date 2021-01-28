$(document).ready(function() {
    $(".search").on("click", function (event) {
        event.preventDefault();
    // songkick API
    var apiKey = "not sure yet";
    var queryURL = "https://api.songkick.com/api/3.0/artists/379603/gigography.json?apikey={your_api_key}" + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
};