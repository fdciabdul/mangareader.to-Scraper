const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
const mkdirp = require("mkdirp");
const db = require("./db");
const cliProgress = require('cli-progress');
var clc = require("cli-color");
const NetworkSpeed = require('network-speed'); 
const testNetworkSpeed = new NetworkSpeed();
const bar1 = new cliProgress.SingleBar({
  format: 'Download Image |' + clc.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Speed: {speed}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
});
const browserconfig = {
  //defaultViewport: null,
  // devtools: true,
  headless: true,
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  args: ["--mute-audio"],
  userDataDir: "abdul",
};
puppeteer.use(StealthPlugin());

async function speedNet(url) {
  const baseUrl = url;
  const fileSizeInBytes = 500000;
  const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
  return speed;
}

async function startApp() {
  console.log("Starting ....")
  const browser = await puppeteer.launch(browserconfig);
  const page = await browser.newPage();

  await page.setViewport({ width: 1366, height: 768 });
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );

  await page.goto("https://mangareader.to/az-list", {
    waitUntil: "load",
  });
  const numpage = await page.$$eval("li.page-item > a", (as) =>
    as.map((a) => a.href)
  );
  const linkpage = numpage.slice(-1).pop().split("page=")[1];
  // console.log(linkpage)
  for (var i = 0;  i< linkpage.length; i++) {
    console.log(clc.yellow("Collect link manga in page number : " + i));
    await page.goto("https://mangareader.to/az-list?page=" + i);
    const mangalink = await page.$$eval(
      "div.manga-detail > h3.manga-name > a",
      (as) => as.map((a) => a.href)
    );
    console.log(clc.red("Found Link Manga : ") + mangalink.length);
    for (var i = 0;  i< mangalink.length; i++) {
      await page.goto(mangalink[i], {
        waitUntil: "load",
      });

      // =========== manga detail

      let title = await page.$(
        "#ani_detail > div > div > div.anis-content > div.anisc-detail > h2"
      );

      let valuetitle = await page.evaluate((el) => el.textContent, title);
      let titlejapan = await page.$(
        "#ani_detail > div > div > div.anis-content > div.anisc-detail > h2"
      );

      let valuetitlejapan = await page.evaluate(
        (el) => el.textContent,
        titlejapan
      );

      let description = await page.$(
        "#modaldesc > div > div > div.modal-body > div"
      );

      let valuedescription = await page.evaluate(
        (el) => el.textContent,
        description
      );

      let genre = await page.$(
        "#ani_detail > div > div > div.anis-content > div.anisc-detail > div.sort-desc > div.genres"
      );

      let valuegenre = await page.evaluate((el) => el.textContent, genre);
      let type = await page.$(
        "#ani_detail > div > div > div.anis-content > div.anisc-detail > div.sort-desc > div.anisc-info-wrap > div.anisc-info > div:nth-child(1) > a"
      );
      type = await page.evaluate((el) => el.textContent, type);
      let status = await page.$(
        "#ani_detail > div > div > div.anis-content > div.anisc-detail > div.sort-desc > div.anisc-info-wrap > div.anisc-info > div:nth-child(2) > span.name"
      );
      status = await page.evaluate((el) => el.textContent, status);
      let author = await page.$(
        "#ani_detail > div > div > div.anis-content > div.anisc-detail > div.sort-desc > div.anisc-info-wrap > div.anisc-info > div:nth-child(3) > a"
      );
      author = await page.evaluate((el) => el.textContent, author);
      let published = await page.$(
        "#ani_detail > div > div > div.anis-content > div.anisc-detail > div.sort-desc > div.anisc-info-wrap > div.anisc-info > div:nth-child(4) > span.name"
      );
      published = await page.evaluate((el) => el.textContent, published);
      let score = await page.$(
        "#ani_detail > div > div > div.anis-content > div.anisc-detail > div.sort-desc > div.anisc-info-wrap > div.anisc-info > div:nth-child(5) > span.name"
      );
      score = await page.evaluate((el) => el.textContent, score);
      let views = await page.$(
        "#ani_detail > div > div > div.anis-content > div.anisc-detail > div.sort-desc > div.anisc-info-wrap > div.anisc-info > div:nth-child(6) > span.name"
      );
      views = await page.evaluate((el) => el.textContent, views);
      // ========================

      let chapterlink = await page.$$eval(
        "#en-chapters > li > a , #ja-chapters > li > a",
        (as) => as.map((a) => a.href)
      );
      chapterlik = chapterlink.reverse();
      const volumelink = await page.$$eval(
        "#ja-volumes > div > div.manga-poster > a , #ja-volumes > div > div.manga-poster > a",
        (as) => as.map((a) => a.href)
      );
      var jumlah = chapterlink.length;

      var desc = valuedescription.replace(/                   /g, "");
      console.log(
        clc.blue(`
  ===============================

  Scraping manga : ${valuetitle}
  Japan Title : ${valuetitlejapan}
  Chapter : ${jumlah} Chapter
  Volume : ${volumelink.length} Volume
  Genre : ${valuegenre.replace(/^\s+|\s+$|\s+(?=\s)/g, "")}
  Description :
  ${desc}


  Type : ${type.replace(/^\s+|\s+$|\s+(?=\s)/g, "")}
  Status : ${status.replace(/^\s+|\s+$|\s+(?=\s)/g, "")}
  Author : ${author.replace(/^\s+|\s+$|\s+(?=\s)/g, "")}
  Published ${published.replace(/^\s+|\s+$|\s+(?=\s)/g, "")}
  Score : ${score.replace(/^\s+|\s+$|\s+(?=\s)/g, "")}
  ===============================
  `)
      );

      await mkdirp("./manga/" + valuetitle.replace(/(\W+)/gi, "-"));

      console.log(" Inserting To Database..");

      await db.insertManga(
        valuetitle,
        valuetitlejapan,
        desc,
        jumlah,
        valuegenre.replace(/^\s+|\s+$|\s+(?=\s)/g,
        type.replace(/^\s+|\s+$|\s+(?=\s)/g, ""),
        author.replace(/^\s+|\s+$|\s+(?=\s)/g, ""),
        published.replace(/^\s+|\s+$|\s+(?=\s)/g, ""),
        score.replace(/^\s+|\s+$|\s+(?=\s)/g, ""),
        views.replace(/^\s+|\s+$|\s+(?=\s)/g, ""),
        status.replace(/^\s+|\s+$|\s+(?=\s)/g, ""),
        "./manga/" + valuetitle.replace(/(\W+)/gi, "-")
      );

      console.log(clc.green(" Scraping Chapter ..."))
      for (var i = 0;  i< chapterlink.length; i++) {
        let chaptername = chapterlink[i].split("/")[6];
        await page.goto(chapterlink[i], {
          waitUntil: "networkidle0",
          timeout: 0,
        });
        await mkdirp(
          "./manga/" + valuetitle.replace(/(\W+)/gi, "-") + "/" + chaptername
        );
        console.log("Collecting Image from Chapter " + chaptername);

        await page.waitForTimeout(10000);

        const imagelink = await page.evaluate(() =>
          Array.from(
            document.querySelectorAll(
              "#vertical-content > div.iv-card.iv-card"
            ),
            (element) => element.getAttribute("data-url")
          )
        );

        // console.log(imagelink);
        bar1.start(imagelink.length - 1, 0);
        for (var i = 0;  i< imagelink.length; i++) {
          const speed = await speedNet(imagelink[i])
          // console.log(i)
          bar1.update(i, {
            speed: speed.kbps
        });
          var viewSource = await page.goto(imagelink[i]);
          const buff = await viewSource.buffer();
          fs.writeFile(
            "./manga/" +
              valuetitle.replace(/(\W+)/gi, "-") +
              "/" +
              chaptername +
              "/img" +
              i +
              ".jpg",
            buff,
            function (err) {
              if (err) {
                return console.log(err);
              }
            }
          );
         
        }
      
      }
      bar1.stop();
      // Scraping Volume 
      console.log(clc.green(" Scraping Volume ..."))
     
      for (var i = 0;  i< volumelink.length; i++){
        let volumname = volumelink[i].split("/")[6];
        await page.goto(volumelink[i], {
          waitUntil: "networkidle0",
          timeout: 0,
        });
        await mkdirp(
          "./manga/" + valuetitle.replace(/(\W+)/gi, "-") + "/" + volumname
        );
        console.log("Collecting Image from Chapter " + volumname + "\n");
    
        await page.waitForTimeout(10000);

        const volumimage = await page.evaluate(() =>
          Array.from(
            document.querySelectorAll(
              "#vertical-content > div.iv-card.iv-card"
            ),
            (element) => element.getAttribute("data-url")
          )
        );

        console.log(volumimage);
        bar1.start(volumimage.length, 0);
        for (var i = 0;  i< volumimage.length; i++) {
        
          bar1.update(i);
          var viewSource = await page.goto(volumimage[i]);
          const buff = await viewSource.buffer();
          fs.writeFile(
            "./manga/" +
              valuetitle.replace(/(\W+)/gi, "-") +
              "/" +
              volumname +
              "/img" +
              i +
              ".jpg",
            buff,
            function (err) {
              if (err) {
                return console.log(err);
              }
            }
          );
        }
      }
    }
  }
}

startApp();
