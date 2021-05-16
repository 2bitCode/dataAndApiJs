// SERVER SIDE JS FILE

const { json } = require("express");
const express = require("express");
const DataStore = require("nedb");

const app = express();
app.listen(3000, () => console.log("listeninig...."));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new DataStore((filename = "database.db"));
database.loadDatabase();

app.post("/api", (request, response) => {
  console.log("I got request!");
  const timeStamp = Date.now();
  request.body.timeStamp = timeStamp;
  database.insert(request.body);
  console.log(request.body);
  response.json({
    status: "success",
    latitude: request.body.lat,
    longitude: request.body.lon,
    timeStamp: request.body.timeStamp,
  });
});
