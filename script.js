function checkCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#myinput");
  let nameCityBig = document.querySelector("#city-big");
  nameCityBig.innerHTML = `${inputCity.value.toUpperCase()}`;
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

let formSearch = document.querySelector("#search-form");
formSearch.addEventListener("submit", checkCity);
let buttonSearch = document.querySelector("#button-search");
buttonSearch.addEventListener("click", checkCity);

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

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#to-change-value");
  h2.innerHTML = `${temperature}`;
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
