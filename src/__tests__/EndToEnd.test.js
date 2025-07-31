/** @jest-environment node */

import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {

  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      // We'll keep the sandbox args as they are good practice for CI environments
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('.event');
  }, 30000);

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  }, 30000);

});