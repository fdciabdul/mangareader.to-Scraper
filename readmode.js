const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const browserconfig = {
    //defaultViewport: null,
    // devtools: true,
  headless: false,
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  args: ["--mute-audio"],
  userDataDir: "abdul"
};
puppeteer.use(StealthPlugin());
async function startApp() {
const browser = await puppeteer.launch(browserconfig);
const page = await browser.newPage();

await page.setViewport({ width: 1366, height: 768 });
await page.setUserAgent(
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
);

await page.goto("https://mangareader.to/read/zombiepowder-6755/en/chapter-26.2", {
    waitUntil: "load"
  });
// const numpage = await page.$$eval('li.page-item > a', as => as.map(a => a.href))
// const linkpage = numpage.slice(-1)
// .pop()
// .split("page=")[1];
// console.log(linkpage)
// for(var i =0; i < linkpage + 1; i++){
//     console.log("Collect link manga in page number : "+ i)
//     await page.goto("https://mangareader.to/az-list?page="+ i);
//     const mangalink = await page.$$eval('div.manga-detail > h3.manga-name > a', as => as.map(a => a.href))
//     console.log(mangalink)
// }
await page.evaluate(() => {
    document.querySelector("#header > div > div.auto-div > div.float-right.hr-right > div.hr-setting.mr-2").click();
  })
}

startApp();