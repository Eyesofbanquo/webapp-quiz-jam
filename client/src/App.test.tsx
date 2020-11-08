import React from "react";
import { render } from "@testing-library/react";
import puppeteer from "puppeteer";
import App from "./App";

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true,
  };

  return process.env.NODE_ENV === "test" ? debugging_mode : {};
};

describe("on page load", () => {
  test("loads correctly", async () => {
    let browser = await puppeteer.launch({});
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400,
      },
      userAgent: "",
    });

    await page.goto("http://localhost:3000/");
    const navbar = await page.$eval(".nav", (e) => e.className);
    console.log(navbar);
    expect(navbar).toBeTruthy();
    browser.close();
  });
});
