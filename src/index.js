const express = require("express");
const Scrapper = require("./scrapper");

const app = express();
const newScrapper = new Scrapper("test URL");
newScrapper.on("scrapeStarted", (data) => {
  console.log(data);
});

// newScrapper.startScrapping();

app.listen(3000, () => {
  console.log("app is running");
});
