const puppeteer = require('puppeteer');

const startBrowser = async () => {
  let browser;
  try {
    console.log('Opening the browser...');
    browser = await puppeteer.launch({
      headless: false, //Anteriormente estaba en true para que se ejecute en modo desatendido
      args: ['--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true
    });
  } catch (error) {
    console.log('Could not create a browser instance => : ', error);
  }
  return browser;
};

module.exports = { startBrowser };
