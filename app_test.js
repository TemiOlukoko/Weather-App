//USING THE FORECAST API

//Require request package
const request = require("request"); //use http also
//Require express framework
const express = require("express");
const app = express(); //invoke express
//Requiring body parser (express middleware)
const bodyParser = require("body-parser");
const { exception } = require("console");

//Access all static files within public folder
app.use(express.static("public"));
//Access all static files within body-parser folder
app.use(bodyParser.urlencoded({ extended: true }));
//Setup template engine
app.set("view engine", "ejs");

// //INPUT VARIABLES
// //created value for api key
const url = "https://api.openweathermap.org/data/2.5/forecast";
const apiKey = "951dfd3c3028861db0a5daec2f517d79";

//CREATE CONSTANTS FOR CURRENT TEMP. FEELS LIKE TEMP & HUMIDITY

//SETTING UP ROOT PATH (HOME PAGE)
app.get("/", function (req, res) {
  res.render("index", { forecast: null, error: null });
  // res.render("index", {weather: null, error: null}); //renders the view and sends equivalent HTML to client
});

//SETTING UP POST REQUESTS
app.post("/", function (req, res) {
  const city = req.body.city;

  const options = {
    method: "POST",
    url: `${url}?q=${city}&units=metric&appid=${apiKey}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  request(options, function (error, response, body) {
    if (error) {
      res.render("weather", { forecast: null, error: "Error, please try again" });
    }

    if (response.statusCode === 200) {
      //parse data into object
      const weatherData = JSON.parse(body);
      //getting list out of weatherData object 
      const reports = weatherData.list;

      //creating empty array that data will go into
      const reportsByDay = {};

      //for every report,
      reports.map(item => {
        //get dt (date timestamp) from API 
        const dateTime = new Date(item.dt * 1000)
        //get the current date
        //getDate() is a method on built in Date() JS object. Converts 10/09/20 to just '10'
        const day = dateTime.getDate()

        //At this point, the code looks like this (if we previously got 10):
        /*
        .
        .
        ],
          10: [{}]
        ]
        .
        .
        */

        if (!reportsByDay[day]) {
          reportsByDay[day] = [];  //if reports by day is undefined (false), set it to an empty array
        }

        reportsByDay[day].push({ ...item }); //... is the spread operator. Copies code from one array into another
        //reportsByDay at the begining is the same as []
        console.log(reportsByDay[11]);
        const test = reportsByDay[11];
        //JSON to HTML
        document.getElementById("app").innerHTML = `
<h1 class="app-title">(${test.length} is the visibility)</h1>
<p>The temperature now is ${test.map(function (pet) {
          return `
<div class="animal">
  <h1>Temperature: ${pet.main.temp}</h1>
  <h1>Humidity: ${pet.main.humidity}</h1>
  <h1>Date & Time: ${pet.dt_txt}</h1>
  <h1>Feels like: ${pet.main.feels_like}</h1>
</div>
`
        }).join('')}
`
        //res.render here?
        app.get('/', function(req, res) {
          res.render('basic.html');
      });
        //res.render("weather", {forecast: reportsByDay, error: "Error, please try again"});
      });
    }
  });
});

//ROUTE TO WEATHER PAGE
app.get("/weather", function (req, res) {
  res.render("weather", { forecast: null, error: null })
});

//CREATE SERVER THATS LISTENING ON PORT 3000 FOR CONNECTIONS
app.listen(3000, function () {
  console.log("You are now connected to the server!!!");
});
