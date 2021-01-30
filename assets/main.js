$(document).ready(function () {
    $("#submit-btn").on("click", function (event) {
        event.preventDefault();
        // songsterr API
       
        var artist = $("#artistName").val();
        var queryURL = "http://www.songsterr.com/a/ra/songs.json?pattern=" + artist;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(queryURL);
        });

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

