var keys = require('./keys.js');
var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});
var params = {
    'name': 'Stacie Meierhoefer',
    'count': 20,
}

client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if(error) {
        console.log(error);
    } else {
        for(var i = 0; i < tweets.length; i++){
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
        }
    
    // console.log(response);  // Raw response object. 
    }
});

//Run the request module on a URL with a JSON
// request("http://www.omdbapi.com/?apikey=9471f43e&t=remember+the+titans&y=&plot=short&r=json", function(error, response, body) {

//   // If there were no errors and the response code was 200 (i.e. the request was successful)...
//   if (!error && response.statusCode === 200) {

//     // Then we print out the imdbRating
//     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
//   }
// });