import { config } from "./config.js";

const position = {};

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (location) => {
      console.log("async", position);
      // const api_key = "b111afc8f7de16f99a904c5af0357466";
      const api_key = config.API_KEY;
      const api_url = `http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${api_key}&units=metric`;

      async function getWeatherData() {
        const response = await fetch(api_url);
        const data = await response.json();
        // DOM MANIPULATION
        const root = document.querySelector(".container");
        root.textContent = null;
        for (const item in data.main) {
          const element = document.createElement("div");
          element.textContent =
            item == "temp" ||
            item == "feels_like" ||
            item == "temp_min" ||
            item == "temp_max"
              ? `🌈 ${item.toUpperCase()} : ${data.main[item]} C 🌈`
              : `🌈 ${item.toUpperCase()} : ${data.main[item]} 🌈`;
          root.appendChild(element);
        }
      }

      getWeatherData().catch((err) => console.log(err.message));
    },
    (error) => console.log(error.message)
  );
} else {
  console.log("Error!");
}
