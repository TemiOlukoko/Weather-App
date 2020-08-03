
//Require request package
const request = require('request');
//Require express framework
const express = require("express");
const app = express() //invoke express
//Setup template engine
app.set("view engine", "ejs")

//SETTING UP ROOT PATH (HOME PAGE)
app.get("/", function(req, res){
    res.render("index"); //renders the view and sends equival;ent HTML to client
})

// //INPUT VARIABLES
// //created value for api key
// let apiKey = '951dfd3c3028861db0a5daec2f517d79';
// //created value for city
// let city = 'abuja';
// //created value for url
// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

// //MAKING API CALL- TESTING ENDPOINTS
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
