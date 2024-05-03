const pageScraper = require('../../utils/pageScraper');

const scrapeAll = async (browserInstance, category) => {
  let browser;
  try {
    browser = await browserInstance;
    let scrapedData = {};
    scrapedData[category] = await pageScraper.scraper(browser, category);
    await browser.close();
    console.log(scrapedData);
  } catch (error) {
    console.log('Could not resolve the browser instance! => ', error);
  }
};

module.exports = (browserInstance, category) =>
  scrapeAll(browserInstance, category);
