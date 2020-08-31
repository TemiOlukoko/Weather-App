
//USING THE FORECAST API

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

//CREATE CONSTANTS FOR CURRENT TEMP. FEELS LIKE TEMP & HUMIDITY

//SETTING UP ROOT PATH (HOME PAGE)
app.get("/", function(req, res){
    res.render("index", {forecast: null, error: null});
    // res.render("index", {weather: null, error: null}); //renders the view and sends equivalent HTML to client
})

const url = "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=951dfd3c3028861db0a5daec2f517d79"
// const city = req.body.city;

//SETTING UP POST REQUESTS
// app.post("/", function(req, res){
//     const city = req.body.city;
//     // let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
// request(url, function (err, response, body){ //checking for an error
//         if(err){ //if there's an error, render to the index.ejs page
//             res.render("weather", {forecast: null, error: "Error, please try again"});
//         } else { //if no API error, parse JSON into usable JavaScript object
//             let forecast = JSON.parse(body) //convert JSON into readable JS Object format
//             if(forecast.main == undefined){ //if user inputs invalid character, e.g. 3, dshdhdhdh
//                 res.render("weather", {forecast: null, error: "Error, please try again"});
//             } else { //if weather.main != undefined --> if user inputs valid location
//                 let forecastText = `It's ${forecast.main.temp} degrees Celsius in ${forecast.name}!`;
//                 res.render("weather", {forecast: forecast, error: null});
//                 console.log(forecast);
//             }
//         }
//     });
// })

function getWeatherData() {
    let headers = new Headers();
  
    return fetch(url, {
      method: 'GET',
      headers: headers
    }).then(data => {
      return data.json();
      console.log(data);
    });
  }

//ROUTE TO WEATHER PAGE
app.get('/weather', function (req, res) {
    res.render("weather", {forecast: null, error: null})
});

//CREATE SERVER THATS LISTENING ON PORT 3000 FOR CONNECTIONS
app.listen(3000, function () {
    console.log("You are now connected to the server!!!")
})
