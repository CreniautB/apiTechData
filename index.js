const express = require("express");
const cors = require("cors");
const fetch = require("fetch");
const app = express();
const event = require("./event");
const video = require("./video");
const axios = require("axios");
const xml2js = require("xml2js");
const fs = require("fs");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.get("/event", (req, res) => {
  res.json(event);
});

app.get("/video", (req, res) => {
  const url = "https://vimeo.com/techdatafrance/videos/rss";
  axios(url).then((reponse) => {
    xml2js.parseString(reponse.data, (err, result) => {
      if (err) {
        throw err;
      }
      let videoVimeoData = result.rss.channel[0].item;
      res.json(videoVimeoData);
    });
  });
});

app.get("/", (req, res) => {
  res.send("Api is running.");
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running."));
