const browserObject = require('../utils/browser');
const scraperController = require('../api/controllers/pageController');

let browserInstance = browserObject.startBrowser();

scraperController(browserInstance, 'Characters');
