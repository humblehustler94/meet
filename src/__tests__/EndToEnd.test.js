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

  // -- Test for Scenario 2 --
  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  // --- NEW TEST FOR SCENARIO 3 ---
  test('User can collaspe an event to hide details', async () => {
    // 1. First, click button to EXPAND the details
    await page.click('.event .details-btn');

    // 2. We need to find the details to make sure they are visible before we collapse them
    let eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();

    // 3. Now, click the SAME button again to COLLAPSE the details
    await page.click(' .event .details-btn');

    // 4. Look for details element again
    eventDetails = await page.$(' .event .details');

    // 5. Assert that this time, the element does NOT exist (it is null)
    expect(eventDetails).toBeNull();
  });

});