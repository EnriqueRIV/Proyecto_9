const fs = require('fs');

const scraperObject = {
  url: 'https://www.starwars.com/databank',
  async scraper(browser, category) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);

    await page.$eval(`.filter-name[data-title="${category}"] `, (element) =>
      element.click()
    );
    await new Promise((time) => setTimeout(time, 2000));

    let scrapedData = [];
    const scrapeCurrentPage = async () => {
      let showMoreButtonExist = false;
      try {
        const showMoreButton = await page.$eval(
          'div.show_more_container',
          (element) =>
            window.getComputedStyle(element).getPropertyValue('display')
        );
        if (showMoreButton !== 'none') {
          showMoreButtonExist = true;
        }
      } catch (error) {
        showMoreButtonExist = false;
        console.log(error);
      }
      if (showMoreButtonExist) {
        await page.$eval('.show_more_container > a', (element) =>
          element.click()
        );
        await new Promise((time) => setTimeout(time, 1000));
        return scrapeCurrentPage();
      }
      await page.waitForSelector(
        `.filter-name[data-title="${category}"].active`
      );
      let urls = await page.$$eval(
        'section ul.blocks-list-view > li',
        (links) => {
          links = links.map((element) => element.querySelector('h3 > a').href);
          return links;
        }
      );

      let pagePromise = (link) =>
        new Promise(async (resolve, reject) => {
          let dataObjet = {};
          let newPage = await browser.newPage();
          await newPage.goto(link);
          dataObjet['name'] = await newPage.$eval(
            'h2.title > span.long-title',
            (name) => name.textContent
          );
          dataObjet['description'] = await newPage.$eval(
            'div.desc-sizer > p.desc',
            (desc) => desc.textContent
          );
          dataObjet['imgData'] = await newPage.$eval(
            'div.aspect > img',
            (image) => image.src
          );
          resolve(dataObjet);
          await newPage.close();
        });

      for (link in urls) {
        let currentPageData = await pagePromise(urls[link]);
        scrapedData.push(currentPageData);
      }

      await page.close();
      return scrapedData;
    };
    let data = await scrapeCurrentPage();
    const jsonData = JSON.stringify(data);
    fs.writeFile(`${category}.json`, jsonData, () => {
      console.log('data writed!');
    });
    return data;
  }
};

module.exports = scraperObject;
