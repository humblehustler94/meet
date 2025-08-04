/** @jest-environment node */

import puppeteer from 'puppeteer';

// ====================================================================
//      TOP-LEVEL SETUP (APPLIES TO ALL `describe` BLOCKS)
// ====================================================================

jest.setTimeout(90000);

// Declare variables ONCE at the top-level scope
let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 250,
    timeout: 0,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
});

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto('http://localhost:5173/');
  await page.waitForSelector('.event');
});

afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});


// ====================================================================
//      TEST SUITE 1: "SHOW/HIDE AN EVENT DETAILS"
// ====================================================================
describe('show/hide an event details', () => {
  // NO MORE variable declarations or hooks in here.

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn');
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});


// ====================================================================
//      TEST SUITE 2: "FILTER EVENTS BY CITY"
// ====================================================================
describe('filter events by city', () => {
  // NO MORE variable declarations or hooks in here.

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.type('.city', 'Berlin');
    await page.waitForSelector('.suggestions');
    const suggestions = await page.$$('.suggestions li');
    expect(suggestions.length).toBe(2);
  });

  test('User can select a city from the suggested list', async () => {
    await page.type('.city', 'Berlin');
    await page.waitForSelector('.suggestions');
    await page.click('.suggestions li');
    await page.waitForSelector('.suggestions', { hidden: true });

    const expectedEventCount = 17;
    await page.waitForFunction((count) => {
      const events = document.querySelectorAll('.event');
      return events.length === count;
    }, {}, expectedEventCount);

    const events = await page.$$('.event');
    expect(events.length).toBe(expectedEventCount);
  });
});