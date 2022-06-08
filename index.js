const express = require("express");
const cors = require("cors");
const axios = require("axios");
const xml2js = require("xml2js");
const cheerio = require("cheerio");
const rp = require("request-promise");

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

app.get("/job", (req, res) => {
  const url = "https://www.welcometothejungle.com/fr/companies/tech-data/jobs";
  async function run() {
    const options = {
      url,
      resolveWithFullResponse: true,
      transform: (body) => {
        return cheerio.load(body);
      },
    };
    try {
      const $ = await rp(options);
      let arr = [];
      $(".ais-Hits-list-item").map((_, element) => {
        arr.push($(element).html()); // just output the content too to check everything is alright
      });
      res.send(arr);
      console.log(arr.forEach((elem) => console.log(elem)));
    } catch (e) {
      console.log(e);
    }
  }

  run();
});

app.get("/", (req, res) => {
  res.send("Api is running.");
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running."));
