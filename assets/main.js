$(document).ready(function () {

    if (localStorage.getItem('recentSearches') === null) {
        var recentSearches = [];
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    } else {
        var recentSearches = JSON.parse(localStorage.getItem('recentSearches'));
    }
    console.log();

    function displayChips(array) {

        $("#chip-container").empty()

        for (var i = 0; i < array.length; i++) {
            const element = array[i];

            var chip = $("<div>").addClass("chip").text(element)
            $("#chip-container").append(chip)
        }
    }

    $("#submit-btn").on("click", function (event) {
        event.preventDefault();
        // songsterr API

        var artist = $("#artistName").val();
        var queryURL = "http://www.songsterr.com/a/ra/songs.json?pattern=" + artist;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var data = response.slice(0, 10);
            console.log(data);
            console.log(queryURL);
        });

        song = $("#songName").val();
        artist = $("#artistName").val();
        queryUrl = "https://api.lyrics.ovh/v1/" + artist + "/" + song + "/";

        // Saving artist and song to array
        recentSearches.push([artist, song]);
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches))

        displayChips(recentSearches)

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

