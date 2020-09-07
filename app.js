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
        console.log(weatherData);
        //GET 5 ARRAYS BASED ON SPECIFIC DAY
        const time = new Date().getHours();
        //1. get hold of current time (24 hour format)
        weatherData.list.forEach(function (single){
          var textHour = single.dt_txt.substring(11, 13);
        //2. get hold of hour from weatherData
        //example "dt_txt": "2020-07-28 21:00:00" ( var textHour= '21')
          var numberHour = parseInt(textHour, 10);
        //3. Convert string '21' to int 21 !
          var difference = Math.abs(time - numberHour);
        //4. To get latest time, find out time difference
        //example if it was 22:00 the 22(time)-21(numberHour)=1(difference)
          if (
            difference === 1 ||
            difference === 0 ||
            (time === 23 && numberHour === 21) ||
            (time === 24 && numberHour === 0) ||
            (time === 2 && numberHour === 00)
          ) 
        {
          daysArray.push(single);
        }
      });
      console.log(daysArray);
        //FOR LOOP THAT PRINTS WEATHER.MAIN INFO
        //let mainText = JSON.parse(body).list[0].weather[0].main;
        //console.log(mainText)
        // for (var i = 0; i < mainText.length; i++){
        //     console.log(mainText);
        // } 
    };
  });

//ROUTE TO WEATHER PAGE
app.get("/weather", function (req, res) {
    res.render("weather", {forecast: null, error: null})
});

//CREATE SERVER THATS LISTENING ON PORT 3000 FOR CONNECTIONS
app.listen(3000, function () {
  console.log("You are now connected to the server!!!");
});
