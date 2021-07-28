function displayTemperature(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#main-temp-value");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let currentCity = "Brighton"; //`${searchInput.value}`;
let units = "metric";
let apiKey = "e4c991b27b566dc4b5b311b6f8d9ac5c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
