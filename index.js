const express = require("express");
const cors = require("cors");
const axios = require("axios");
const xml2js = require("xml2js");

const event = require("./event");
const articleBlog = require("./articleBlog");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/event", (req, res) => {
  res.json(event);
});

app.get("/articleBlog", (req, res) => {
  res.json(articleBlog);
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
