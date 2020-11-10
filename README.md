# Weather Forecast APP
Live Site:
https://forecast-application-to.herokuapp.com/

# Summary
This is my weather forecast app. Thus far I have been able to make a request to the Open Weather Map API using the weather forecast API and set up index.ejs and weather.ejs to view response as HTML file.
- 5 day weather forecast API docs:
https://openweathermap.org/forecast5#name5
- The forecast API is a 5 day forecast available at any location or city. It includes weather data every 3 hours.
- The code for this can be found in the app.js file


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
- Due to the format of the data provided by OpenWeatherMap's free API service for the 5 day weather forecast, I had issues splitting up the 'list' pasrt of the JSON response into an object of arrays. In order to do this, I created functions that parsed and processed the data into an accessible array of objects. Check out app.js and weather.ejs to see how I did this.
