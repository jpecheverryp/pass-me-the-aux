$(document).ready(function () {
    

    function findLyrics(artist, song) {
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
    }

    if (localStorage.getItem('recentSearches') === null) {
        var recentSearches = [];
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    } else {
        var recentSearches = JSON.parse(localStorage.getItem('recentSearches'));
    }

    

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

            var chip = $("<div>").addClass("chip").text(chipString)
            chip.css('text-transform', 'capitalize')
            chip.attr('data-artist', element[0].toLowerCase())
            chip.attr('data-song', element[1].toLowerCase())
            $("#chip-container").append(chip)

            var closeChip = $('<i>').addClass('close material-icons').text('close');
            chip.append(closeChip)
            closeChip.on('click', function (e) {
                var song = $(this).parent().data('song')
                removeStorageItem(song)
            })

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

    function addStorageItem(artist, song) {
        if (isSaved(song) === false ) {
            recentSearches.push([artist, song]);
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
        }
    }

    function removeStorageItem(song) {
        for (let i = 0; i < recentSearches.length; i++) {
            const element = recentSearches[i];
            
            if (element[1].toLowerCase().trim() === song.toLowerCase().trim()) {
                
                recentSearches.splice(i, 1);
                i--;
            }   
        }
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
    }

    displayChips(recentSearches)

    $("#submit-btn").on("click", function (event) {
        event.preventDefault();

        // Input Values
        song = $("#songName").val();
        artist = $("#artistName").val();

        // songsterr API

        var artist = $("#artistName").val();
        var queryURL = "https://www.songsterr.com/a/ra/songs.json?pattern=" + artist;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var data = response.slice(0, 10);
            for(var i = 0; i < data.length; i++){
                var relatedSongs = $("<div class='collection'>");
                var relSongEl = $("<a href='#!' class='collection-item'>")
                relSongEl.text(response[i].title);
                relatedSongs.append(relSongEl);
                $("#related").append(relatedSongs);
            }

        });

        // Saving artist and song to array

        addStorageItem(artist, song)

        findLyrics(artist,song)

        displayChips(recentSearches)

        // Related Songs Click Event
    });
    $("#related").on("click", ".collection-item", function () {
        console.log($(this).text())
        artist = $("#artistName").val();
        var song = $(this).text()
        findLyrics(artist, song)
    })
})

