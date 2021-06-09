//weather api key - 710fb85e67050a5a7ccb882b71cd1e8b
//grab coordinates from weather call and plug that into the second api call for onecall (uv index)


//var searchForm = document.getElementById("search-form");

//console.log(searchForm);


var searchButton = document.getElementById("search-button");
var cityList = JSON.parse(localStorage.getItem("cities"))||[];


searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  var city = document.getElementById("search-input").value; 
  console.log(city);
  if (city) {
    document.getElementById("search-input").value = "";
    fetchCities(searchButton);
  }



  var weatherTest = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=710fb85e67050a5a7ccb882b71cd1e8b"
  var mainForecast = document.getElementById("forecast-main");
  mainForecast.innerHTML = "";
  cityList.push(city);
  console.log(cityList);
  localStorage.setItem("cities", JSON.stringify(cityList));

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
    heading.innerHTML = "Weather Forecast for  " + cityName + ": " 
    mainForecast.appendChild(heading);

    var weatherTwo = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=710fb85e67050a5a7ccb882b71cd1e8b";
    fetch(weatherTwo)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log("this is daily weather", data.daily[1].weather[0].description)
        console.log(data["daily"][0].weather[0])
        console.log(data["daily"][1].temp.day)
        console.log(data["daily"][0].wind_speed)
        console.log(data["daily"][0].humidity)
        console.log(data.current.temp)
        console.log(data.current.humidity)
        console.log(data.current.weather[0].description)
        console.log(data.current.uvi)
        console.log(data.current.wind_speed)
      
        //current weather
      
      var forecastCard = document.createElement("div");
      forecastCard.classList.add("card");
      mainForecast.appendChild(forecastCard);
      var currentIconCall = data.current.weather[0].icon;
      var currentIcon = document.createElement("img");
      currentIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + currentIconCall + "@2x.png");
      currentIcon.setAttribute("height", "100px");
      currentIcon.setAttribute("width", "100px");
      forecastCard.appendChild(currentIcon);
      var date = moment().format("dddd MMM Do");
      var dateLine = document.createElement("h3");
      dateLine.innerHTML = "Forecast for " + date;
      var currentWeather = document.createElement("p");
      forecastCard.appendChild(dateLine);
      forecastCard.appendChild(currentWeather);
      var currentTemperature = data.current.temp;
      var currentWind = data.current.wind_speed;
      var currentConditions = data.current.weather[0].description;
      var currentHumidity = data.current.humidity;
      var currentUvi = data.current.uvi;
      currentWeather.textContent = currentConditions + ", " + currentTemperature + "°C, Humidity: " + currentHumidity + "%, Wind Speed: " + currentWind + "km/h, UV Index: " + currentUvi;
      
      //5-day forecast
        for (i=0; i<5; i++) {
          var weatherInfo = document.createElement("p");
          var temperatureList = document.createElement("p");
          var dateSpot = document.createElement("h3");
          var iconCall = data["daily"][i].weather[0].icon;
          var forecastDate = moment().add((i + 1), 'day').format("dddd MMM Do");
          var weatherIcon = document.createElement("img");
          weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + iconCall + "@2x.png");
          weatherIcon.setAttribute("height", "50px");
          weatherIcon.setAttribute("width", "50px");
          var weatherDescription = data["daily"][i].weather[0].description;
          var uvi = data["daily"][i].uvi;
          var dailyTemperature = data["daily"][i].temp.day;
          var lowTemperature = data["daily"][i].temp.min;
          var highTemperature = data["daily"][i].temp.max;
          var windSpeed = data["daily"][i].wind_speed;
          var humidity = data["daily"][i].humidity;
          forecastCard.appendChild(dateSpot);
          dateSpot.innerHTML = "Forecast for " + forecastDate;
          forecastCard.appendChild(weatherIcon);
          forecastCard.appendChild(weatherInfo);
          weatherInfo.textContent = weatherDescription + ", Humidity: " + humidity + "%, Wind Speed: " + windSpeed + "km/h, UV Index: " + uvi;
          forecastCard.appendChild(temperatureList);
          temperatureList.textContent = "Temperature: " + dailyTemperature + "°C, High: " + highTemperature + "°C, Low: " + lowTemperature + "°C";
        }
  });

  function saveSearches() {
    var savedCities = document.getElementById("saved-searches");
    retrievedData = JSON.parse(localStorage.getItem("cities"));
    for (i = 0; i < cityList.length; i++) {
    var cityButtons = document.createElement("button");
      cityButtons.innerHTML = cityList[i];
      console.log(cityList[i]);

    }
  savedCities.append(cityButtons);
  }
 saveSearches()





  })
});
