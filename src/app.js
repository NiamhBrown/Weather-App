function displayTemperature(response) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#main-temp-value");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
}
let currentCity = "Brighton"; //`${searchInput.value}`;
let units = "metric";
let apiKey = "e4c991b27b566dc4b5b311b6f8d9ac5c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
