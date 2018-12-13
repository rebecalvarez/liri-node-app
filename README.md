# Liri Bot app by Rebeca Dodero

LIRI is a Language Interpretation and Recognition Interface.
Use LIRI to get your band events information, find out about a song,
or a movie, or just choose a random action from your own random file.

## Video Explanation
Check out the code explanation on this [YouTube video](https://youtu.be/9TxUmm2hZ4g)

## Installs

The [package.json](https://github.com/rebecalvarez/liri-node-app/blob/master/package.json)
lists dependent node packages, but for your convenvice, these are the ones to install.


### Spotify

`npm install Node-Spotify-API`

### Axios

`npm install axios`

### FS

`npm install fs`

### Moment

`npm install moment`

### DotEnv

`npm install dotenv`

## Get Started

Here's a quick rundown of the commands you can use in LIRI.

### Get your Band Events Information

Retrieves up to your Band's events:

`node liri.js concert-this "Maroon5"`

### Get Song Info

Retrieves song information for a track:

`node liri.js spotify-this-song "I Want it That Way"`

### Get Movie Info

Retrieves movie information for a movie:

`node liri.js movie-this "Star Wars"`

### Get Random Info

Gets random text inside a file and does what it says:
the document random.txt has serveral different commands, when it displays, it has a menu of all the commands and displays the answers to  those commands.

`node liri.js do-what-it-says`
