import { connect } from "../dbconfig/db.config";
import { Flat, Flats } from "../models/flat.model";
import puppeteer from "puppeteer";
import readline from "readline";

export class FlatRepository {
  private db: any = {};
  private flatRespository: any;
  private static _instance: FlatRepository;

  private constructor() {
    this.db = connect();
    // For Development
    this.db.sequelize.sync({ force: true }).then(() => {
      console.log("Drop and re-sync db.");
    });

    this.flatRespository = this.db.sequelize.getRepository(Flats);
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new FlatRepository();
    }
    return this._instance;
  }

  async getFlats(limit: number | undefined, offset: number | undefined) {
    try {
      const flats = await this.flatRespository.findAll({ limit, offset });
      return flats;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async getFlatsNumber() {
    try {
      const flatsNumber = await this.flatRespository.count();
      return flatsNumber;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async createFlat(flat: Flats) {
    let data = {};
    try {
      data = await this.flatRespository.create(flat);
    } catch (err) {
      console.log("Error: ", err);
    }
    return data;
  }

  async updateFlat(flat: Flats) {
    let data = {};
    try {
      data = await this.flatRespository.update(
        { ...flat },
        {
          where: {
            id: flat.id,
          },
        }
      );
    } catch (err) {
      console.log("Error: ", err);
    }
    return data;
  }

  async deleteFlat(flatId: string) {
    let data = {};
    try {
      data = await this.flatRespository.destroy({
        where: {
          id: flatId,
        },
      });
    } catch (err) {
      console.log("Error: ", err);
    }
    return data;
  }

  async insertScrapedData() {
    try {
      const URL =
        "https://www.sreality.cz/en/search/for-sale/apartments/all-countries";

      const browserFetcher = puppeteer.createBrowserFetcher();
      let revisionInfo = await browserFetcher.download("1095492");
      const browser = await puppeteer.launch({
        executablePath: revisionInfo!.executablePath,
        ignoreDefaultArgs: ["--disable-extensions"],
        headless: true,
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
      });
      const page = await browser.newPage();

      await page.goto(URL, { waitUntil: "networkidle2" });
      let itemsToScrape = 500;
      let data: Flat[] = [];

      //if the shadow DOM were open
      //const buttonHandle = await page.evaluateHandle(`document.querySelector(".szn-cmp-dialog-container").shadowRoot.querySelector('button.scmp-btn.scmp-btn--default.w-button--footer')`);

      //await buttonHandle.click();

      //await page.waitForSelector(".szn-cmp-dialog-container", { timeout: 0 });
      //console.log("Dialog detected. Click accept if you want all the data scraped.");

      while (data.length < itemsToScrape) {
        let newResults = await page.evaluate(
          (data, itemsToScrape) => {
            let results: Flat[] = [];
            let items = document.querySelectorAll(
              ".property-list .dir-property-list .property"
            );
            items.forEach((item) => {
              if (data.length + results.length < itemsToScrape) {
                results.push({
                  name: item.querySelector(".name")
                    ? item.querySelector(".name")!.textContent!
                    : "",
                  url: item
                    .querySelector(
                      ".ng-scope.ng-isolate-scope > div > div > a > img"
                    )
                    ?.getAttribute("src")!,
                });
              }
            });

            return results;
          },
          data,
          itemsToScrape
        );
        data = data.concat(newResults);

        if (data.length < itemsToScrape) {
          await page.click(".paging-item .paging-next");
          await page.waitForSelector(
            ".property-list .dir-property-list .property",
            { timeout: 5000 }
          );
          await page.waitForSelector(".paging-item .paging-next", {
            timeout: 5000,
          });
        }
      }
      await browser.close();

      console.log("Scrape successful");
      console.log("Inserting data");

      await this.flatRespository.bulkCreate(data);
    } catch (error) {
      console.error("ERROR", error);

      return [];
    }
  }
}
