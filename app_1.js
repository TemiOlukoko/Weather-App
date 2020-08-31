//USING THE CURRENT WEATHER API

//Require request package
const request = require('request');
//Require express framework
const express = require("express");
const app = express() //invoke express
//Requiring body parser (express middlewear)
const bodyParser = require("body-parser");

//Access all static files within public folder
app.use(express.static("public"));
//Access all static files within body-parser folder
app.use(bodyParser.urlencoded({extended: true}));
//Setup template engine
app.set("view engine", "ejs")

// //INPUT VARIABLES
// //created value for api key
const apiKey = '951dfd3c3028861db0a5daec2f517d79';
// //created value for city
// let city = 'abuja';
// //created value for url
// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

//SETTING UP ROOT PATH (HOME PAGE)
app.get("/", function(req, res){
    res.render("index", {weather: null, error: null}); //renders the view and sends equivalent HTML to client
})

//SETTING UP POST REQUESTS
app.post("/", function(req, res){
    let city = req.body.city;
    // let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
request(url, function (err, response, body){ //checking for an error
        if(err){ //if there's an error, render to the index.ejs page
            res.render("weather", {weather: null, error: "Error, please try again"});
        } else { //if no API error, parse JSON into usable JavaScript object
            let weather = JSON.parse(body) //convert JSON into readable JS Object format
            if(weather.main == undefined){ //if user inputs invalid character, e.g. 3, dshdhdhdh
                res.render("weather", {weather: null, error: "Error, please try again"});
            } else { //if weather.main != undefined --> if user inputs valid location
                let weatherText = `It's ${weather.main.temp} degrees Celsius in ${weather.name}!`;
                res.render("weather", {weather: weatherText, error: null});
            }
        }
    });
})

//TEST TO TRY ROUTING TO WEATHER PAGE
app.get('/weather', function (req, res) {
    res.render("weather", {weather: null, error: null})
  });


// // //MAKING API CALL- TESTING ENDPOINTS
// request(url, function (err, response, body) {
//   if(err){
//     console.log('error:', error);
//   } else {
//     console.log('body:', body);
//   }
// });

//CREATE SERVER THATS LISTENING ON PORT 3000 FOR CONNECTIONS
app.listen(3000, function () {
    console.log("You are now connected to the server!!!")
})
