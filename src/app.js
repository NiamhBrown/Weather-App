let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentDate.getDay()];
let day = document.querySelector("#day");
day.innerHTML = currentDay;

let currentHour = currentDate.getHours();
let currentMinute = currentDate.getMinutes();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let time = document.querySelector("#time");
time.innerHTML = `${currentHour}:${currentMinute}`;

/* function displayAffirmation() {
  let affirmationElement = document.querySelector("#daily-affirmation-content");
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  //if days= [1] innerHtml= blahblah ect OR creat a affirmation object array and if day[1] inner html = object[1]

  let affirmations = [
    {aff1},
    {aff2},
    {aff.3},
  ];
} */

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              <div class="weather-forecast-day">${day}</div>
              <img
                src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                alt=""
                width="42"
                class="weather-forecast-icon"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-foreacast-temperature-max"> 18° </span>
                <span class="weather-foreacast-temperature-min"> 15° </span>
              </div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let units = "metric";
  let apiKey = "e4c991b27b566dc4b5b311b6f8d9ac5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#main-temp-value");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let units = "metric";
  let apiKey = "e4c991b27b566dc4b5b311b6f8d9ac5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp-value");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp-value");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Brighton");

/* displayAffirmation(); */
