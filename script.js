function checkCity(city) {
  let apiKey = `4c9b53e4f8f5eb00df5915bdca340605`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function checkAfterSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#myinput");
  let nameCityBig = document.querySelector("#city-big");
  nameCityBig.innerHTML = `${inputCity.value.toUpperCase()}`;
  checkCity(inputCity.value);
}

let formSearch = document.querySelector("#search-form");
formSearch.addEventListener("submit", checkAfterSubmit);
let buttonSearch = document.querySelector("#button-search");
buttonSearch.addEventListener("click", checkAfterSubmit);

/* function changeToFahrenheit(event) {
          event.preventDefault();
          let switchFah = document.querySelector("#to-change-value");
          switchFah.innerHTML = "73";
        }*/

/*function changeToCelsius(event) {
          event.preventDefault();
          let switchCel = document.querySelector("#to-change-value");
          switchCel.innerHTML = "23";
        }*/

/*let aFahrenheit = document.querySelector("#fahrenheit-id");
        let aCelsius = document.querySelector("#celsius-id");
        aCelsius.addEventListener("click", changeToCelsius);
        aFahrenheit.addEventListener("click", changeToFahrenheit);*/

function getForecast(coordinates) {
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#to-change-temp");
  h2.innerHTML = `${temperature}`;

  let windspeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#to-change-wind");
  wind.innerHTML = `${windspeed}`;

  let humidity = Math.round(response.data.main.humidity);
  let hum = document.querySelector("#to-change-humidity");
  hum.innerHTML = `${humidity}`;

  let daymax = Math.round(response.data.main.temp_max);
  let max = document.querySelector("#to-change-max");
  max.innerHTML = `${daymax}`;

  let daymin = Math.round(response.data.main.temp_min);
  let min = document.querySelector("#to-change-min");
  min.innerHTML = `${daymin}`;

  let icon = document.querySelector("#icon-clouds");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#big-forecast");

  let forecastHTML = `<div class="row days forecast">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2 weather-forecast">
            <h3 class="forecast-day">${formatForecastDay(forecastDay.dt)}</h3>
            <p class="forecast-image">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" id="icon-clouds" />
            </p>
            <div class="weather-temp-forecast">
              <span class="maxforcast"> ${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="minforcast"> ${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayW = days[now.getDay()];

  let hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();

  let minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();

  let fullDate = `${dayW}  ${hours}:${minutes}`;
  let dataReload = document.querySelector("#day-today");
  dataReload.innerHTML = `${fullDate}`;
}

formatDate();

checkCity("Kyiv");
