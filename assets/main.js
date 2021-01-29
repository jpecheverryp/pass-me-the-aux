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
        console.log('test');
        song = $("#songName").val();
        artist = $("#artistName").val();
        queryUrl = "https://api.lyrics.ovh/v1/" + artist + "/" + song + "/";
        console.log(queryUrl);

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (result) {
            console.log(result);

            var lyrics = result.lyrics;
            console.log(lyrics);

            var songTitle = $('#song-title');
            songTitle.text(song);

            var lyricsEl = $('#lyrics');
            lyricsEl.text(lyrics)
        })
    });
})

