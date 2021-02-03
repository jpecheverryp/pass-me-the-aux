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
            // Gets the current Element from the array
            const element = array[i];

            // Gets the artist from array
            var displayArtist = element[0]
            // Gets the song from the element array
            var displaySong = element[1]
            // Join both artist and song name 
            const chipString = displayArtist + ' - ' + displaySong;

            var chip = $("<div>").addClass("chip").text(chipString).css('text-transform', 'capitalize')
            $("#chip-container").append(chip)
        }
    }

    function isSaved(song) {
        var localSearches = JSON.parse(localStorage.getItem('recentSearches'))
        
        for (var i = 0; i < localSearches.length; i++) {
            if(song.toLowerCase().trim() === localSearches[0][1].toLowerCase().trim() ) {
                return true;
            }
        }
        return false;
        
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
            for(var i = 0; i < data.length; i++){
                var relatedSongs = $("<div class='collection'>");
                var relSongEl = $("<a href='#!' class='collection-item'>")
                relSongEl.text(response[i].title);
                relatedSongs.append(relSongEl);
                $("#related").append(relatedSongs);
            }

        });

        song = $("#songName").val();
        artist = $("#artistName").val();
        queryUrl = "https://api.lyrics.ovh/v1/" + artist + "/" + song + "/";

        // Saving artist and song to array

        if (isSaved(song) === false ) {
            recentSearches.push([artist, song]);
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
        }


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

