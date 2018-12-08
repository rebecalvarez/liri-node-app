require("dotenv").config();
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var reference = process.argv[3];

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