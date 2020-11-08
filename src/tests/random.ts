// // import puppeteer from "puppeteer";
// // import "puppeteer";
// import * as puppeteer from "puppeteer";
// import { AppController } from "../../server";
// import * as chai from "chai";
// import { expect } from "chai";
// import "mocha";
// import "chai-http";
// chai.use(require("chai-http"));

// const isDebugging = () => {
//   const debugging_mode = {
//     headless: false,
//     slowMo: 250,
//     devtools: true,
//   };

//   return process.env.NODE_ENV === "test" ? debugging_mode : {};
// };

// describe("on page load", async () => {
//   it("loads correctly", (done) => {
//     const controller = new AppController();
//     chai
//       .request(controller.app)
//       .get("/")
//       .then(async (result) => {
//         let browser = await puppeteer.launch(isDebugging());
//         let page = await browser.newPage();

//         page.emulate({
//           viewport: {
//             width: 500,
//             height: 2400,
//           },
//           userAgent: "",
//         });

//         await page.goto("http://localhost:5000/");
//         const navbar = await page.$eval("#root", (e) => e.id);
//         console.log(navbar);
//         expect(navbar).to.not.equal(undefined);
//         browser.close();
//         done();
//       })
//       .catch();
//   });

//   it("loads correctly", (done) => {
//     const controller = new AppController();
//     chai
//       .request(controller.app)
//       .get("/")
//       .then(async (result) => {
//         let browser = await puppeteer.launch(isDebugging());
//         let page = await browser.newPage();

//         page.emulate({
//           viewport: {
//             width: 500,
//             height: 2400,
//           },
//           userAgent: "",
//         });

//         await page.goto("http://localhost:5000/");
//         const navbar = await page.$eval("#root", (e) => e.id);
//         console.log(navbar);
//         expect(navbar).to.not.equal(undefined);
//         browser.close();
//         done();
//       })
//       .catch();
//   });
// });
