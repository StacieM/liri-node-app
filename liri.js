var keys = require('./keys.js');
var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');
var spotify = require('spotify');

var args = '';

for (var i = 3; i < process.argv.length; i++) {
    args += process.argv[i] + ' ';
}
  
function myTweets(){
    var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
    });
    var twitterParams = {
        'name': 'Stacie Meierhoefer',
        'count': 20,
    }

    client.get('statuses/user_timeline', twitterParams, function(error, tweets, response) {
        if(error) {
            console.log(error);
        } else {
            for(var i = 0; i < tweets.length; i++){
                console.log("========================================");
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
                console.log("========================================\n");
            }
        }
    });
}

function mySpotify(){
    if(args == ''){
        args = 'The Sign Ace of Base';
    }
    var songInfo;
    var spotifyDefaultURL = "https://api.spotify.com/v1/search?q=the%20sign%20ace%20of%20base&type=track&limit=1"
    var spotifyURL = "https://api.spotify.com/v1/search?q=" + args + "&type=track&limit=1";
    request(spotifyURL, function(error, data) {
        songInfo = JSON.parse(data.body);
        if(error) {
            console.log('Error from Spotify: ' + error);
        } else if(songInfo.tracks.items[0] === undefined){
            request(spotifyDefaultURL, function(error, data) {
                songInfo = JSON.parse(data.body);
                printSong();
            });
        } else {
            printSong();
        }
    })
    function printSong() {
        console.log("\n\n========================================");
        console.log("Artist: " + songInfo.tracks.items[0].artists[0].name);
        console.log("Album: " + songInfo.tracks.items[0].album.name);
        console.log("Song: " + songInfo.tracks.items[0].name);
        console.log("Preview URL: " + songInfo.tracks.items[0].preview_url);
        console.log("========================================\n\n");
    }
}

function myMovieThis(){
    if(args == '') {
        args = "Mr Nobody";
    }
    var movieInfo;
    var movieDefaultURL = "http://www.omdbapi.com/?i=tt3896198&apikey=9471f43e&t=Mr%20Nobody&plot=full&tomatoes=true&r=json";
    var movieURL = "http://www.omdbapi.com/?i=tt3896198&apikey=9471f43e&t=" + args + "&plot=full&tomatoes=true&r=json";
    request(movieURL, function(error, response, body) {
        movieInfo = JSON.parse(body);
    if(error) {
        console.log('Error from OMDB: ' + error);
    } else if(movieInfo.Response == 'False') {
        request(movieDefaultURL, function(error, response, body) {
            movieInfo = JSON.parse(body);
            printMovie();
        });
    } else {
        printMovie();
    }})

    function printMovie() {
        console.log("\n\n========================================");
        console.log("Title: " + movieInfo.Title);
        console.log("Year: " + movieInfo.Year);
        console.log("IMDB Rating: " + movieInfo.imdbRating);
        console.log("Country: " + movieInfo.Country);
        console.log("Language: " + movieInfo.Language);
        console.log("Plot: " + movieInfo.Plot);
        console.log("Actors: " + movieInfo.Actors);
        console.log("Rotten Tomatoes: " + movieInfo.tomatoURL);
        console.log("========================================\n\n");
    }
}

function myDoWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err) {
            return console.log(err);
        }
        var output = data.split(",");        
        if (output[0] === "my-tweets"){
            myTweets();
        } else if (output[0] === "spotify-this-song"){
            args = output[1];
            mySpotify(); 
        } else if (output[0] === "movie-this"){
            args = output[1];
            myMovieThis();
        } 
    });
}

if (process.argv[2] === "my-tweets") {
    myTweets();
} else if (process.argv[2] === "spotify-this-song") {
    mySpotify();
} else if (process.argv[2] === "do-what-it-says") {
    myDoWhatItSays();
} else if (process.argv[2] === "movie-this") {
    myMovieThis();
}

