// Creating maps and tiles using Leaflet.js
const map = L.map("mapIss").setView([0, 0], 1);

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(map);

// Making Marker and Icon
const issIcon = L.icon({
  iconUrl: "iss320.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

// Fetching Api
async function getISSData() {
  const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

  const response = await fetch(api_url);
  const data = await response.json();

  const { latitude, longitude } = data;

  console.log(latitude, longitude);

  marker.setLatLng([latitude, longitude]);
  map.setView([latitude, longitude], 3);

  document.getElementById("lat").textContent = latitude.toFixed(2);
  document.getElementById("long").textContent = longitude.toFixed(2);
}

getISSData().catch(() => console.log("shit"));

setInterval(getISSData, 1000);
