// SERVER SIDE JS FILE

const { json, response } = require("express");
const express = require("express");
const DataStore = require("nedb");

const app = express();
app.listen(3000, () => console.log("listeninig...."));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new DataStore((filename = "database.db"));
database.loadDatabase();

app.get("/api", (request, response) => {
  console.log("Got a get request!");
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  console.log("I got request!");
  const timeStamp = new Date();
  request.body.timeStamp = timeStamp.toString();
  database.insert(request.body);
  console.log(request.body);
  response.json(request.body);
});
