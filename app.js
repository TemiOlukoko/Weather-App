//USING THE FORECAST API
const request = require("request"); //use http also
const express = require("express");
const app = express(); 
//Requiring body parser (express middleware)
const bodyParser = require("body-parser");

//Access all static files within public folder
app.use(express.static("public"));
//Access all static files within body-parser folder
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// //INPUT VARIABLES
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

  //REQUESTING FOR WEATHER DATA, PROCESSING AND PARSING THE RESPONSE
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
      const weatherDataList = reports.map(item => {
        //get dt (date timestamp) from API
        const dateTime = new Date(item.dt * 1000);
        //get the current date
        //getDate() is a method on built in Date() JS object. Converts 10/09/20 to just '10'
        const day = dateTime.getDate();
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
        return reportsByDay;
      });
      res.render("weather", {weatherData: Array.from([...new Set(weatherDataList)])});//Set is a DS removes duplicates and turns into array
    
    }
  });
});

//ROUTE TO WEATHER PAGE
app.get("/weather", function (error, req, res) {
  //error handling here using regex???
  res.render("weather", { forecast: null, error: null })
});

//CREATE SERVER THATS LISTENING ON PORT 3000 FOR CONNECTIONS
app.listen(process.env.PORT || 3000, function () {
  console.log("You are now connected to the server!!!");
});
