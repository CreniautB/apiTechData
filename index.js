const express = require("express");
const cors = require("cors");

const app = express();
const event = require("./event");
const video = require("./video");
const axios = require("axios");
const xml2js = require("xml2js");

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

  fetchData(url).then((res) => {
    xml2js.parseString(res.data, (err, result) => {
      if (err) {
        throw err;
      }

      // `result` is a JavaScript object
      // convert it to a JSON string
      const json = JSON.stringify(result, null, 4);

      // log JSON string
      let videoVimeoData = JSON.stringify(result.rss.channel[0].item);
      res.json(videoVimeoData);
    });
  });

  async function fetchData(url) {
    console.log("Crawling data...");
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));

    if (response.status !== 200) {
      console.log("Error occurred while fetching data");
      return;
    }
    return response;
  }
  res.json(video);
});

app.get("/", (req, res) => {
  res.send("Api is running.");
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running."));
