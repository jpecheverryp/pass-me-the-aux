$(document).ready(function () {
    $("#submit-btn").on("click", function (event) {
        event.preventDefault();
        // // songkick API
        // var apiKey = "not sure yet";
        // var queryURL = "https://api.songkick.com/api/3.0/artists/379603/gigography.json?apikey={your_api_key}" + apiKey;

        // $.ajax({
        //     url: queryUrl,
        //     method: "GET"
        // }).then(function (response) {
        //     console.log(response);
        // });
        song = $("#songName").val();
        artist = $("#artistName").val();
        queryUrl = "https://api.lyrics.ovh/v1/" + artist + "/" + song + "/";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (result) {
            // Get lyrics
            var lyrics = result.lyrics;
            // Write title 
            $('#song-title').text(song);
            // Write Lyrics
            $('#lyrics').html("<div id='lyrics'>" + result.lyrics.replace(/\n/g, "<br />") + '</div>');
            $('#lyrics').addClass('overflow');
        })
    });
})

