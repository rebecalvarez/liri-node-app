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
var theSong='';
var theMovie='';
var theBand='';

//Getting reference (user choice) to accept several words
for (var i = 3; i < arg.length; i++) {
    reference.push(arg[i])
}

var referenceBand = reference.join("");
// End of Reference

// Commands:
//concert-this  --- spotify-this-song   ----  movie-this --- do-what-it-says

if (command === 'concert-this') {
    concert(referenceBand);
} else if (command === 'spotify-this-song') {
    spotifySong(reference);
} else if (command === 'movie-this') {
    movie(reference);
} else if (command === 'do-what-it-says') {
    doThat();
}

function concert(referenceBand) {
    var bandUrl = "https://rest.bandsintown.com/artists/" + referenceBand + "/events?app_id=codingbootcamp";
    axios.get(bandUrl).then(
        function (response) {
            console.log("  ");
            console.log("********GETTING***BAND/ARTIST***INFO: "+referenceBand+"  **************");
            for (var i = 0; i < response.data.length; i++) {

                var datetime = response.data[i].datetime; //Saves datetime response into a variable

                var dateArr = datetime.split('T'); //Splits the date and time in the response

                var concertResults =
                    "--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name +
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateArr[0], "YYYY-DD-MM").format('DD/MM/YYYY'); //dateArr[0] should be the date separated from the time
                //and it changes to a new format
                console.log(concertResults);
            }    console.log("  ");
                 console.log("******************************************************************  ");
                 console.log("  ");
        })
        .catch(function (error) {
            console.log('This is the error: ' + error);
        });
}



function spotifySong(reference) {
    if(reference.length === 0){
        reference = "The Sign";
    }
    spotify
    .search({ type: 'track', query: reference })
    .then(function(response) {
        console.log("  ");
        console.log("******SPOTIFIYING****"+reference+"***********");
        console.log("  ");
        for (var i = 0; i < 5; i++) {
            var spotifyResults = 
                "--------------------------------------------------------------------" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;
                    
            console.log(spotifyResults);

            // Artist(s)

            // The song's name
            
            // A preview link of the song from Spotify
            
            // The album that the song is from

        }
        console.log("  ");
        console.log("********************************************************************  ");
        console.log("  ");
    })
    .catch(function(err) {
        console.log(err);
    });



}


function movie(reference) {
    if(reference.length === 0){
        reference = "mr nobody";
    }
    axios.get('http://www.omdbapi.com/?t=' + reference + '&plot=short&apikey=trilogy').then(
        function (response) {
            var rotten = response.data.Ratings[1].Value;
            // console.log("This is the Rotten value : "+rotten)
            if (rotten === "undefined") { rotten = "Not available" }
            console.log("  ");
            console.log("******MOVIE**INFORMATION**FOR**"+response.data.Title+"******");
            console.log("  ");
            console.log("* Title: " + response.data.Title);
            console.log("* Year: " + response.data.Year);
            console.log("* IMDB Rating: " + response.data.Rated);
            console.log("* Rotten Tomatoes Rating: " + rotten);
            console.log("* Country Produced: " + response.data.Country);
            console.log("* Language: " + response.data.Language);
            console.log("* Plot: " + response.data.Plot);
            console.log("* Actors: " + response.data.Actors);
            console.log("  ");
            console.log("**************************************************************");
            console.log("  ");



            // * Title of the movie.
            // * Year the movie came out.
            // * IMDB Rating of the movie.
            // * Rotten Tomatoes Rating of the movie.
            // * Country where the movie was produced.
            // * Language of the movie.
            // * Plot of the movie.
            // * Actors in the movie.
        })
        .catch(function (error) {
            console.log('This is the error: ' + error);
        });
}

function doThat() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(',');
        console.log('')
        console.log('-------------------MENU--OF--CONTENT-------------------')
        console.log('')
        for (var i = 0; i < dataArr.length; i++) {
        if (dataArr[i] === 'spotify-this-song'){ 
            theSong= dataArr[++i];
            console.log('--------SPOTIFIYING-------'+theSong+'---------')
            spotifySong(theSong);

        }else if (dataArr[i] === 'movie-this'){  
            theMovie= dataArr[++i];
            console.log('--------WHATCH-THIS-MOVIE-------'+theMovie+'---------')
                movie(theMovie);
        }else if (dataArr[i] === 'concert-this'){
            theBand= dataArr[++i];
            console.log('--------CHECK-OUT-THIS-BAND-------'+theBand+'---------')
            concert(theBand);
        } else { console.log("Sorry, This command is not accepted");
            
        }
            
    }
    })

}

