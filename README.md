# Weather Forecast Application
Live Site:
https://forecast-application-to.herokuapp.com/

# Summary
This weather forecast application utilises the OpenWeatherMap API in order to display a 5 day weather forecast in any worldwide location or city.
- 5 day weather forecast API docs:
https://openweathermap.org/forecast5#name5

# Languages
- JavaScript
- HTML
- CSS

# Frameworks and Technologies
- Node.js
- Express

# Vendor Technologies
- FontAwesome

# Third-party APIs
- OpenWeatherMap API

# App features
- Gets the 5 day weather forecast over 3 hour intervals for any worldwide location
- Currently only desktop responsive 

# Challenges
- Due to the format of the data provided by OpenWeatherMap's free API service for the 5 day weather forecast, I had issues splitting up the 'list' part of the JSON response into an object of arrays. In order to do this, I created functions that parsed and processed the data into an accessible array of objects. Check out app.js and weather.ejs to see how I did this.
