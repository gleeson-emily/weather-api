//weather api key - 710fb85e67050a5a7ccb882b71cd1e8b
//grab coordinates from weather call and plug that into the second api call for onecall (uv index)
//var searchForm = document.getElementById("search-form");
//console.log(searchForm);
var searchButton = document.getElementById("search-button");
var savedCities = document.getElementById("saved-searches");
var cityList = JSON.parse(localStorage.getItem("cities"));
var city;

function saveSearches() {
  cityList = JSON.parse(localStorage.getItem("cities"))
  if (!cityList) {
    return
  } else {
    savedCities.innerHTML = ""
    for (i = 0; i < cityList.length; i++) {
      var cityButtons = document.createElement("button");
      cityButtons.className = "previous-searches"
      console.log(cityButtons);
      cityButtons.innerHTML = cityList[i];
      savedCities.append(cityButtons);
      }
    }
  };
  
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  city = document.getElementById("search-input").value;
  console.log(city);
  if (city) {
    document.getElementById("search-input").value = "";
    fetchCities(searchButton);
    saveSearches(); 
  }
});

savedCities.addEventListener("click", (event) => {
  event.preventDefault
  event.stopPropagation();
  console.log(event.target.innerHTML);
  console.log(document.querySelector(".previous-searches").innerHTML)
  fetchCities(city = event.target.innerHTML);
});


function fetchCities() {
  var weatherTest = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=710fb85e67050a5a7ccb882b71cd1e8b"
  var mainForecast = document.getElementById("forecast-main");
  mainForecast.innerHTML = "";
  if (cityList === null) {
    var newList = []
    newList.push(city);
    localStorage.setItem("cities", JSON.stringify(newList));
  } 
  else {
    cityList.push(city);
    localStorage.setItem("cities", JSON.stringify(cityList));
    console.log(cityList);
  }
  fetch(weatherTest)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data["coord"]["lat"])
    console.log(data["coord"]["lon"])
    var latitude = data["coord"]["lat"];
    var longitude = data["coord"]["lon"];
    var cityName = data.name;
    console.log(latitude, longitude);
    var heading = document.createElement("h1");
    heading.classList.add("city-heading");
    heading.innerHTML = "Weather Forecast for  " + cityName + ": " 
    mainForecast.appendChild(heading);
    var weatherTwo = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=710fb85e67050a5a7ccb882b71cd1e8b";
    fetch(weatherTwo)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

      //current weather
      var forecastCard = document.createElement("div");
      forecastCard.classList.add("card");
      forecastCard.classList.add("forecast");
      mainForecast.appendChild(forecastCard);
      var currentIconCall = data.current.weather[0].icon;
      var currentIcon = document.createElement("img");
      currentIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + currentIconCall + "@2x.png");
      currentIcon.setAttribute("height", "100px");
      currentIcon.setAttribute("width", "100px");
      currentIcon.classList.add("center");
      forecastCard.appendChild(currentIcon);
      var date = moment().format("dddd MMMM Do");
      var dateLine = document.createElement("h3");
      dateLine.innerHTML = "Current conditions for " + date;
      var currentWeather = document.createElement("p");
      forecastCard.appendChild(dateLine);
      forecastCard.appendChild(currentWeather);
      var currentTemperature = data.current.temp;
      var currentWind = data.current.wind_speed;
      var currentConditions = data.current.weather[0].description;
      var currentHumidity = data.current.humidity;
      var currentUvi = data.current.uvi;
      currentUv = document.createElement("p");
        if (currentUvi <= 2) {
          currentUv.classList.add("uv-low");
        } else if (currentUvi > 2 || currentUvi <= 5.99) {
          currentUv.classList.add("uv-moderate");
        } else if (currentUvi > 6 || currentUvi <= 7.99) {
          currentUv.classlList.add("uv-high");
        } else if (currentUvi > 8 || currentUvi <= 10.99) {
          currentUv.classList.add("uv-very-high") 
        } else {
          currentUv.classList.add("uv-extreme")
        }
        forecastCard.appendChild(currentUv);
      currentWeather.textContent = "Current conditions: " + currentConditions + ", " + currentTemperature + "°C, Humidity: " + currentHumidity + "%, Wind Speed: " + currentWind + "km/h";
      currentUv.textContent = "UV Index: " + currentUvi;
      //5-day forecast
        for (i=0; i<5; i++) {
          var futureCard = document.createElement("div");
          futureCard.classList.add("card");
          futureCard.classList.add("future-forecast");
          mainForecast.appendChild(futureCard);
          var weatherInfo = document.createElement("p");
          var temperatureList = document.createElement("p");
          var dateSpot = document.createElement("h3");
          var iconCall = data["daily"][i].weather[0].icon;
          var forecastDate = moment().add((i + 1), 'day').format("dddd MMMM Do");
          var weatherIcon = document.createElement("img");
          weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + iconCall + "@2x.png");
          weatherIcon.setAttribute("height", "100px");
          weatherIcon.setAttribute("width", "100px");
          weatherIcon.classList.add("center");
          var weatherDescription = data["daily"][i].weather[0].description;
          var uvi = data["daily"][i].uvi;
          var futureUvi = document.createElement("p");
          if (uvi <= 2) {
            futureUvi.classList.add("uv-low");
          } else if (uvi <= 2 || uvi <= 5.99) {
            futureUvi.classList.add("uv-moderate");
          } else if (uvi <= 6 || uvi <= 7.99) {
            futureUvi.classList.add("uv-high");
          } else if (uvi <= 8 || uvi <= 10.99) {
            futureUvi.classList.add("uv-very-high") 
          } else {
            futureUvi.classList.add("uv-extreme")
          }
          var dailyTemperature = data["daily"][i].temp.day;
          var lowTemperature = data["daily"][i].temp.min;
          var highTemperature = data["daily"][i].temp.max;
          var windSpeed = data["daily"][i].wind_speed;
          var humidity = data["daily"][i].humidity;
          futureCard.appendChild(dateSpot);
          dateSpot.innerHTML = "Forecast for " + forecastDate;
          futureCard.appendChild(weatherIcon);
          futureCard.appendChild(weatherInfo);
          weatherInfo.textContent = "Forecasted conditions: " + weatherDescription + ", Humidity: " + humidity + "%, Wind Speed: " + windSpeed + "km/h";
          futureCard.appendChild(temperatureList);
          temperatureList.textContent = "Temperature: " + dailyTemperature + "°C, High: " + highTemperature + "°C, Low: " + lowTemperature + "°C";
          futureCard.appendChild(futureUvi);
          futureUvi.textContent = "UV Index: " + uvi}
  });
});
}
window.addEventListener("load", saveSearches);

