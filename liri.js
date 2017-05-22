var keys = require('./keys.js');
var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');
var spotify = require('spotify');


if (process.argv[2] === "my-tweets") {
    myTweets();
} else if (process.argv[2] === "spotify-this-song") {
    mySpotify();
} else if (process.argv[2] === "do-what-it-says") {
    myDoWhatItSays();
} else if (process.argv[2] === "movie-this") {
    myMovieThis();
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
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }
        }
    });
}


function mySpotify(){
    var song = process.argv[3];
    request("https://api.spotify.com/v1/search?q=" + song + "&type=track&limit=1", function(error, data) {
        if(error) {
            console.log(error);
        } else {
            var songInfo = JSON.stringify(JSON.parse(data.body[0]));
            console.log(songInfo);
        }
    });
}

function myMovieThis(){
    var movie = process.argv[3];
    request("http://www.omdbapi.com/?i=tt3896198&apikey=9471f43e&t=" + movie + "&y=&plot=short&r=json", function(error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {

        // print out the movie info
        var movieInfo = JSON.parse(body);
        console.log("Title: " + movieInfo.Title);
        console.log("Year: " + movieInfo.Year);
        console.log("IMDB Rating: " + movieInfo.imdbRating);
        console.log("Country: " + movieInfo.Country);
        console.log("Language: " + movieInfo.Language);
        console.log("Plot: " + movieInfo.Plot);
        console.log("Actors: " + movieInfo.Actors);
        console.log("Rotten Tomatoes: " + movieInfo.Ratings[1].Value);
    }
    });
}