/** @jest-environment node */

import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {

  // Override the default Jest timeout for this entire test suite
  jest.setTimeout(90000); // Set timeout to 90 seconds

  let browser;
  let page;

  // beforeAll now ONLY launches the browser. This is done once.
  beforeAll(async () => {
    browser = await puppeteer.launch({
     // headless: false, // <-- NEW: Makes the browser window visible
     // slowMo: 250, // <-- NEW: Slows down each action by 250ms
      timeout: 0, // <-- NEW: Removes Puppeteer's own timeout
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

  // -- Test for Scenario 2 --
  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  // -- Test for Scenario 3 --
  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn');
    let eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
    await page.click(' .event .details-btn');
    eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

});