document.getElementById("app").innerHTML = `
<h1 class="app-title">(${test.length} is the visibility)</h1>
<p>The temperature now is ${test.map(function(pet){
  return `
<div class="animal">
  <h1>Temperature: ${pet.main.temp}</h1>
  <h1>Humidity: ${pet.main.humidity}</h1>
  <h1>Date & Time: ${pet.dt_txt}</h1>
  <h1>Feels like: ${pet.main.feels_like}</h1>
</div>
<table class="animal">
  <tr>
    <td>&nbsp;</td>
    <td>Date & Time</td>
    <td>Date & Time</td>
    <td>Date & Time</td>
    <td>Date & Time</td>
  </tr>
  <tr>
    <td>Temperature</td>
    <td>${pet.main.temp}</td>
    <td>${pet.main.temp}</td>
    <td>${pet.main.temp}</td>
    <td>${pet.main.temp}</td>
  </tr>
<tr>
    <td>Humidity</td>
    <td>${pet.main.humidity}</td>
    <td>${pet.main.humidity}</td>
    <td>${pet.main.humidity}</td>
    <td>${pet.main.humidity}</td>
  </tr>
<tr>
    <td>Feels Like</td>
    <td>${pet.main.feels_like}</td>
    <td>${pet.main.feels_like}</td>
    <td>${pet.main.feels_like}</td>
    <td>${pet.main.feels_like}</td>
  </tr>
</table>
`
}).join('')}
`