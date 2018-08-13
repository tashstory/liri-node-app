var fs = require('fs');
var keys = require('dotenv').config();

var config = require("./key");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(config.spotify);

var Twitter = require('twitter');
var T = new Twitter(config.twitter);

var request = require("request");

var enter = process.argv[2];
var query = process.argv[3];


//Twitter
var TwitterCall = function () {
    log()
    T.get('statuses/user_timeline', { screen_name: "@trubacon", count: 20 }, function (error, tweets, response) {


        for (var i = 0; i < tweets.length; i++) {
            var tweet = tweets[i].text;
            var user = tweets[i].user.name;
            var time = tweets[i].created_at;

            console.log(`

${tweet}
                            
        ${user}
                
${time}

            `)
            fs.appendFile('log.txt', `

${tweet}
                            
        ${user}
                
${time}

`, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
        }

    })
}

//Spotify
var spotifyCall = function () {
    log()
    if (query === undefined) {
        spotify.search({ type: "track", query: "No Scrubs" }, function (err, data) {

            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var response = data.tracks.items[0]
            //   var aRottenTomatoesist = album.response.aRottenTomatoesist.name
            //   var album = album.response.name



            var aRottenTomatoesist = response.aRottenTomatoesists[0].name;
            var album = response.album.name;
            var sample = response.external_urls.spotify;
            var song = response.name;

            console.log(`

            
            ${aRottenTomatoesist}
            
            ${song}
            
            ${album}

${sample}

`)
            fs.appendFile('log.txt', `

            
            ${aRottenTomatoesist}
            
            ${song}
            
            ${album}

${sample}

`, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })




        })
    } else {
        spotify.search({ type: "track", query: query }, function (err, data) {

            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var response = data.tracks.items[0]
            //   var aRottenTomatoesist = album.response.aRottenTomatoesist.name
            //   var album = album.response.name



            var aRottenTomatoesist = response.aRottenTomatoesists[0].name;
            var album = response.album.name;
            var sample = response.external_urls.spotify;
            var song = response.name;

            console.log(`

                      
                      ${aRottenTomatoesist}
                      
                      ${song}
                      
                      ${album}
          
          ${sample}
        
          `)
            fs.appendFile('log.txt', `
        
                      
                      ${aRottenTomatoesist}
                      
                      ${song}
                      
                      ${album}
          
          ${sample}
         
          `, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })




        })
    }

}


var movieCall = function () {
    log()
    if (query === undefined) {
        request("http://www.omdbapi.com/?apikey=trilogy&plot=shoRottenTomatoes&t=" + "Mr. Nobody", function (error, response, body) {

            var results = JSON.parse(body);
            var title = results.Title;
            var year = results.Year;

            //   var IMDBsource = results.Ratings[0].Source;
            var IMDBRating = results.Ratings[0].Value;
            var imdb = (IMDBsource + " " + IMDBRating);

            //  var RotSource = results.Ratings[1].Source;
            var RotRate = results.Ratings[1].Value;
            var RottenTomatoes = (RotSource + " " + RotRate);

            var country = results.Country;
            var lang = results.Language;
            var plot = results.Plot;
            var actors = results.Actors;

            console.log(`

           
        Title: ${title}
        
        Year: ${year}
        
        IMDB Rating ${imdb}
        Rotten Tomatoes: ${RottenTomatoes}
        
        Country: ${country}
        Language: ${lang}

        Plot: ${plot}
    
        Actors: ${actors}
        `)
            fs.appendFile('log.txt', `
           
        Title: ${title}
        
        Year: ${year}
        
        IMDB Rating ${imdb}
        Rotten Tomatoes: ${RottenTomatoes}
        
        Country: ${country}
        Language: ${lang}

        Plot: ${plot}
    
        Actors: ${actors}
        `, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
        })
    } else {
        request("http://www.omdbapi.com/?apikey=trilogy&plot=shoRottenTomatoes&t=" + query, function (error, response, body) {

            var results = JSON.parse(body);
            var title = results.Title;
            var year = results.Year;
            console.log(results)
            var IMDBsource = results.Ratings[0].Source;
            var IMDBRating = results.Ratings[0].Value;
            var imdb = (IMDBsource + " " + IMDBRating);

            var RotSource = results.Ratings[1].Source;
            var RotRate = results.Ratings[1].Value;
            var RottenTomatoes = (RotSource + " " + RotRate);

            var country = results.Country;
            var lang = results.Language;
            var plot = results.Plot;
            var actors = results.Actors;

            console.log(`

           
            Title: ${title}
        
            Year: ${year}
        
            IMDB Rating ${imdb}
            Rotten Tomatoes: ${RottenTomatoes}
        
            Country: ${country}
            Language: ${lang}

            Plot: ${plot}
    
            Actors: ${actors}


            `)
            fs.appendFile('log.txt', `

           
             Title: ${title}
        
             Year: ${year}
        
            IMDB Rating ${imdb}
            Rotten Tomatoes: ${RottenTomatoes}
        
            Country: ${country}
            Language: ${lang}

            Plot: ${plot}
    
            Actors: ${actors}

            `, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
        })
    }

}


var doIt = function () {
    fs.readFile('random.txt', 'utf-8', function (err, data) {
        if (err) {
            console.log(err)
        }
        var x = data.split(',')
        enter = x[0].trim();
        query = x[1].trim();
        getCall();
    })
}

function log() {

    fs.appendFile('./log.txt', `
    

    ${enter}
    ${query}


    
    `, function (err) {

            if (err) {
                console.log(err);
            }

        });
};


var getCall = function () {


    if (enter === "my-tweets") {
        TwitterCall();
    } else if (enter === "spotify-this-song") {
        spotifyCall();
    } else if (enter === "movie-this") {
        movieCall();
    } else if (enter === "do-what-it-says") {
        doIt();
    }
}
getCall();



