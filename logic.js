//weather api key - 710fb85e67050a5a7ccb882b71cd1e8b
//grab coordinates from weather call and plug that into the second api call for onecall (uv index)


//var searchForm = document.getElementById("search-form");

//console.log(searchForm);


var searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  var city = document.getElementById("search-input").value; 
  console.log(city);
  var weatherTest = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=710fb85e67050a5a7ccb882b71cd1e8b"


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
    console.log(latitude, longitude);

    var weatherTwo = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=710fb85e67050a5a7ccb882b71cd1e8b";
    fetch(weatherTwo)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(data["daily"][1].weather)
        console.log(data["daily"][0].weather[0].description)
        console.log(data["daily"][1].temp.day)
        console.log(data["daily"][0].wind_speed)
        console.log(data["daily"][0].humidity)
      
    var mainForecast = document.getElementById("forecast-main");
        for (i=0; i<5; i++) {
          var forecastCard = document.createElement("div");
          var weatherInfo = document.createElement("p");
          var temperatureList = document.createElement("p");
          forecastCard.classList.add("card");
          mainForecast.appendChild(forecastCard);
          var iconCall = data["daily"][i].weather[0].icon;
          var weatherIcon = document.createElement("img");
          weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + iconCall + "@2x.png");
          weatherIcon.setAttribute("height", "75px");
          weatherIcon.setAttribute("width", "75px");
          var weatherDescription = data["daily"][i].weather[0].description;
          var uvi = data["daily"][i].uvi;
          var dailyTemperature = data["daily"][i].temp.day;
          var lowTemperature = data["daily"][i].temp.min;
          var highTemperature = data["daily"][i].temp.max;
          var windSpeed = data["daily"][i].wind_speed;
          var humidity = data["daily"][i].humidity
          forecastCard.appendChild(weatherIcon);
          forecastCard.appendChild(weatherInfo);
          weatherInfo.textContent = weatherDescription + ", Humidity: " + humidity + "%, Wind Speed: " + windSpeed + "km/h, UV Index: " + uvi;
          forecastCard.appendChild(temperatureList);
          temperatureList.textContent = "Temperature: " + dailyTemperature + "°C, High: " + highTemperature + "°C, Low: " + lowTemperature + "°C";
        }
  });

  
  //localStorage.setItem("finalScore", JSON.stringify(finalScore));
  //localStorage.setItem("score-input", scoreInput.value, JSON.stringify(scoreInput.value));

  })
});
