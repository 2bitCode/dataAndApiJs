// const { json } = require("express");

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
    },
    (err) => console.log(err.message)
  );
} else {
  console.log("oops");
}

//showing user's current location on the map
function show_my_pos() {
  marker.setLatLng([pos.latitude, pos.longitude]);
  map.setView([pos.latitude, pos.longitude], 10);
}

// handling submit location to send
// latitude, longitude to the server we created
const input_field = document.querySelector(".input");
const submit_button = document.getElementById("submit");
const final_submit_button = document.getElementById("final-submit");
const nameField = document.getElementById("name");

submit_button.addEventListener("click", (e) => {
  e.preventDefault();
  input_field.style.display = "flex";
});

final_submit_button.addEventListener("click", (e) => {
  e.preventDefault();
  const options = {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: pos,
  };
  nameField.value = null;
  console.log(pos);
  fetch("/api", options);

  // console.log(jsonRes);
});
