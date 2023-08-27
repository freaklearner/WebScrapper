const EventEmitter = require("events");

class Scrapper extends EventEmitter {
  constructor(weburl) {
    super();
    // console.log("event trigger");
    this.startScrapping();
  }

  startScrapping() {
    this.triggerCustomEvents("scrapeStarted", "begining.....");
  }

  triggerCustomEvents(eventName, eventData) {
    process.nextTick(() => {
      this.emit(eventName, eventData);
    });
  }
}

module.exports = Scrapper;
