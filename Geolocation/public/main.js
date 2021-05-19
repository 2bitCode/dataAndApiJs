// Creating maps and tiles using Leaflet.js library
const map = L.map("map").setView([0, 0], 3);

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(map);

// Making Marker and Icon
const marker = L.marker([0, 0]).addTo(map);

//navigating the user's current location using geolocation web api
const pos = {};
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (location) => {
      pos.latitude = location.coords.latitude;
      pos.longitude = location.coords.longitude;
      const lat = pos.latitude;
      const lon = pos.longitude;
      const data = { lat, lon };

      // handling submit location to send
      // latitude, longitude to the server we created
      document.getElementById("submit").addEventListener("click", async (e) => {
        e.preventDefault();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        console.log(JSON.stringify(data));
        const response = await fetch("http://localhost:3000/api", options);
        const json = await response.json();
        console.log(json);
      });
    },
    (err) => console.log(err.message)
  );
} else {
  console.log("oops");
}

//showing user's current location on the map
document.getElementById("locate").addEventListener("click", (e) => {
  e.preventDefault();
  marker.setLatLng([pos.latitude, pos.longitude]);
  map.setView([pos.latitude, pos.longitude], 10);
});
