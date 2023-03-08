const apiKey = "9fd7a449d055dba26a982a3220f32aa2";
const cityForm = document.getElementById("city-form");
const cityInput = document.getElementById("city-input");
const weatherContainer = document.getElementById("weather");
const cityNotFound = document.getElementById("cityNotFound");

cityForm.addEventListener("submit", e => {
  e.preventDefault();
  const city = cityInput.value.trim();
  
  if (!city) {
    return;
  }
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const cityName = data.name;
      const country = data.sys.country;

      weatherContainer.innerHTML = `
        <h2>${cityName}, ${country}</h2>
        <p>Temperature: ${temperature} &#8451;</p>
        <p>Humidity: <span class="humidity">${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
        <p>pressure:${data.main.pressure} m/s</p>
        <p>Description: ${description}</p>
      `;
      cityNotFound.style.display = "none";
    })
    .catch(error => {
      console.error(error);
      cityNotFound.style.display = "block";
    });
});