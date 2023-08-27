const EventEmitter = require("events");
const axios = require("axios");
const cheerio = require("cheerio");

class Scrapper extends EventEmitter {
  constructor(weburl) {
    super();
    this.url = weburl;
    this.startScrapping();
  }

  startScrapping() {
    this.triggerCustomEvents("scrapeStarted", "begining.....");
    this.fetchDataFromUrl()
      .then((htmlContent) => {
        return this.scrapeFromHtml(htmlContent.data);
      })
      .then((data) => {
        this.triggerCustomEvents("scrapeComplete", data);
      });
  }

  scrapeFromHtml(htmlContent) {
    const $ = cheerio.load(htmlContent);
    const title = $("head title").html();
    const meta = $('head > meta[http-equiv="Content-Type"]').attr("content");
    const links = $("head").children("link");
    const arr = [];
    for (let ln of links) {
      arr.push(ln.attribs["href"]);
    }
    return {
      title: title,
      meta,
      links: arr,
    };
  }

  fetchDataFromUrl() {
    try {
      return axios.get(this.url);
    } catch (ex) {
      this.triggerCustomEvents("error", ex.message);
    }
  }

  triggerCustomEvents(eventName, eventData) {
    process.nextTick(() => {
      this.emit(eventName, eventData);
    });
  }
}

module.exports = Scrapper;
