require("dotenv").config();
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
var axios = require('axios')
var moment = require('moment');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var arg = process.argv;
var reference = [];

//Getting reference (user choice) to accept several words
for (var i = 3; i< arg.length ; i++){
 reference.push(arg[i])    
}
reference.join(' ');
// End of Reference

// Commands:
//concert-this  --- spotify-this-song   ----  movie-this --- do-what-it-says

if (command === 'concert-this' ){
    concert();
}else if (command === 'spotify-this-song'){
    spotify(); 
}else if (command === 'movie-this'){
    movie(); 
}else if (command === 'do-what-it-says'){
    dothat(); 
}

function concert(){

}

function spotify(){

}
function movie(){
   
// var movie = process.argv[3]
axios.get('http://www.omdbapi.com/?t='+reference+'&plot=short&apikey=trilogy').then(
    function(response){
        var rotten = response.data.Ratings[1].Value;
        // console.log("This is the Rotten value : "+rotten)
 if (rotten === "undefined"){ rotten = "Not available"}

        
        console.log("***********YOUR***MOVIE***INFORMATION**********");
        console.log("* Title: " + response.data.Title);
        console.log("* Year: " + response.data.Year);
        console.log("* IMDB Rating: " + response.data.Rated);
        console.log("* Rotten Tomatoes Rating: " + rotten);
        console.log("* Country Produced: " + response.data.Country);
        console.log("* Language: " + response.data.Language);
        console.log("* Plot: " + response.data.Plot);
        console.log("* Actors: " + response.data.Actors);
        console.log("***********************************************");

    

        // * Title of the movie.
        // * Year the movie came out.
        // * IMDB Rating of the movie.
        // * Rotten Tomatoes Rating of the movie.
        // * Country where the movie was produced.
        // * Language of the movie.
        // * Plot of the movie.
        // * Actors in the movie.
    }
)
}