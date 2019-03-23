const puppeteer = require("puppeteer");
const program = require("commander");

program
  .version("0.0.1")
  .option("-u, --url [value]", "URL to capture")
  .option("-O, --output [value]", "output file")
  .parse(process.argv);

function takeScrot(url, location) {
  puppeteer
    .launch()
    .then(browser => {
      browser.newPage().then(page => {
        page.goto(url, {waitUntil: 'networkidle0', timeout: 30000}).then(() => {
          page.screenshot({ path: location, fullPage: true }).then(() => {
            browser.close();
          });
        });
      });
    })
    .catch(() => {
      console.log("Woops, could not take the screenshot.");
    });
}

takeScrot(program.url, program.output);
