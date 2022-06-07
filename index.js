const express = require("express");
const app = express();
const event = require("./event");

app.get("/event", (req, res) => {
  res.json(event);
});

app.get("/", (req, res) => {
  res.send("Api is running.");
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running."));
