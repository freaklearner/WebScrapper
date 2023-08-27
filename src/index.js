const express = require("express");
const Scrapper = require("./scrapper");

const app = express();
const newScrapper = new Scrapper("https://toscrape.com/");
newScrapper.on("scrapeStarted", (data) => {
  console.log(data);
});
newScrapper.on("error", (data) => {
  console.log(data);
});
newScrapper.on("scrapeComplete", (data) => {
  console.log(data);
});

// newScrapper.startScrapping();

app.listen(3000, () => {
  console.log("app is running");
});
