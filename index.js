const browserObject = require('./src/utils/browser');
const scraperController = require('./src/api/controllers/pageController');

let browserInstance = browserObject.startBrowser();

scraperController(browserInstance, 'Droids');
