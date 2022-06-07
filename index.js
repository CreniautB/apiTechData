const express = require("express");
const cors = require("cors");

const app = express();
const event = require("./event");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.get("/event", (req, res) => {
  res.json(event);
});

app.get("/", (req, res) => {
  res.send("Api is running.");
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running."));
