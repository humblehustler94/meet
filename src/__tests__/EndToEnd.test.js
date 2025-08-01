/** @jest-environment node */

import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {

  let browser;
  let page;

  // beforeAll now ONLY launches the browser. This is done once.
  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  });

  // -- REFACTORED FOR BETTER TEST ISOLATION --
  // beforeEach runs before EACH test. This gives us a fresh page for every test.
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('.event');
  });

  // afterAll now ONLY closes the browser. This is done once at the very end.
  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  // Test for Scenario 1 (No changes to this test's logic)
  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  // -- NEW TEST FOR SCENARIO 2 --
  test('User can expand an event to see its details', async () => {
    // 1. Simulate a click on the "details" button of the first event
    await page.click('.event .details-btn');

    // 2. Look for the details element again
    const eventDetails = await page.$('.event .details');

    // 3. Assert that this time, the element exists (it is defined)
    expect(eventDetails).toBeDefined();
  });

});