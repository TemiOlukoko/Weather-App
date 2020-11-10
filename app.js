//USING THE FORECAST API
const
//Require request package
const request = require("request"); //use http also
//Require express framework
const express = require("express");
const app = express(); //invoke express
//Requiring body parser (express middleware)
const bodyParser = require("body-parser");
//const { exception } = require("console");

//Access all static files within public folder
app.use(express.static("public"));
//Access all static files within body-parser folder
app.use(bodyParser.urlencoded({ extended: true }));
//Setup template engine
app.set("view engine", "ejs");

// //INPUT VARIABLES
//created value for api key
const url = "https://api.openweathermap.org/data/2.5/forecast";
const apiKey = "951dfd3c3028861db0a5daec2f517d79";

//SETTING UP ROOT PATH (HOME PAGE)
app.get("/", function (req, res) {
  res.render("index", { forecast: null, error: null });//renders the view and sends equivalent HTML to client
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
      // const nameSearch = weatherData.city.name;
      // console.log(weatherData);
      // console.log(nameSearch);
      const reports = weatherData.list;

      //creating empty array that data will go into
      const reportsByDay = {};

      //for every report,
      const weatherDataList = reports.map(item => {
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
        //console.log(reportsByDay);
        return reportsByDay;
      });
      res.render("weather", {weatherData: Array.from([...new Set(weatherDataList)])});//removes duplicates and turns into array
      // res.render("weather", {weatherData: nameSearch, error: null});
    }
  });
});



//ROUTE TO WEATHER PAGE
app.get("/weather", function (req, res) {
  res.render("weather", { forecast: null, error: null })
});

//CREATE SERVER THATS LISTENING ON PORT 3000 FOR CONNECTIONS
app.listen(process.env.PORT || 3000, function () {
  console.log("You are now connected to the server!!!");
});
