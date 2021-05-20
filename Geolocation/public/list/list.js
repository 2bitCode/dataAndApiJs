getData().catch((err) => console.log(err.message));

async function getData() {
  const response = await fetch("http://localhost:3000/api");
  const data = await response.json();

  for (item of data) {
    const root = document.querySelector(".container");
    const latitude = document.createElement("div");
    latitude.textContent = `Latitude: ${item.lat}`;
    root.appendChild(latitude);
    const longitude = document.createElement("div");
    longitude.textContent = `Longitude: ${item.lon}`;
    root.appendChild(longitude);
    const timeStamp = document.createElement("div");
    timeStamp.textContent = `TimeStamp: ${item.timeStamp}`;
    root.appendChild(timeStamp);

    document.body.append(root);
  }
}
