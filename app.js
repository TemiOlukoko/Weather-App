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

  let options = {
    method: "POST",
    url: `${url}?q=${city}&units=metric&appid=${apiKey}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response; //declare response outside of loop
  let daysArray = []; //declare response outside of loop
  let forecast = request(options, function (error, response, body) { 
    if (error) {
      res.render("weather", {forecast: null, error: "Error, please try again"});
    }
    response = this.response;
    // console.log(response.body)
    if (response.statusCode == 200){
        // FOR LOOPS THAT PRINTS WEATHER.DESCRIPTION
        //let listText = JSON.parse(body).list[0].weather[0].description;
        let weatherData = JSON.parse(body);
        //console.log(weatherData);
        const today = new Date('2020-05-21T00:00:00.000Z');
        const day = 60 * 60 * 24 * 1000;
        
        const dateBins = {};
        const nBins = 6; // there can be reports for up to 6 distinct dates

        for (let i = 0; i < nBins; i++) {
          // set up a bin (empty array) for each date
          const date = new Date(today.getTime() + i * day);
          dateBins[date.getDate()] = [];
        }

        const reports = weatherData.list;
        //console.log(reports); //works upto here
        for (const report of reports) { //not sure what this is doing?
          console.log(reports);
            const reportDate = new Date(report.dt * 1000).getDate();
            //console.log(reportDate);
            dateBins[reportDate].push(report);
        }
      console.log(dateBins);
      } 
    });
  });

//ROUTE TO WEATHER PAGE
app.get("/weather", function (req, res) {
    res.render("weather", {forecast: null, error: null})
});

//CREATE SERVER THATS LISTENING ON PORT 3000 FOR CONNECTIONS
app.listen(3000, function () {
  console.log("You are now connected to the server!!!");
});
