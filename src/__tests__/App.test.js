// src/__tests__/App.test.js (Refactored with beforeEach)
// Add integration test to App.test.js file 4.5
// Add 'within', 'userEvent', and 'getEvents' into import 

import { render, screen, within } from '@testing-library/react'; // Added 'within' here
import userEvent from '@testing-library/user-event'; // <-- Added new import line
import { getEvents } from '../api'; // <-- Added new import line 
import App from '../App';

// Note: We don't need 'import React from "react";' because of our modern Babel setup!

// --- UNIT TESTS --- 
// This block is for simple tests that check the App component's own rendering.
describe('<App /> component', () => {
  // --- Step 1: Add the beforeEach block ---
  // This will render the App component before each test runs.
  beforeEach(() => {
    render(<App />);
  });

  // --- Test for CitySearch components presence ---
  test('renders the CitySearch component', () => {
    // render(<App />); call is removed from here
    const citySearchElement = screen.getByTestId("city-search");
    expect(citySearchElement).toBeInTheDocument();
  });

  // --- Test for EventList's presence ---
  test('renders list of events', () => {
    // render(<App />); call is removed from here
    const eventList = screen.getByRole('list');
    expect(eventList).toBeInTheDocument();
  });

  test('renders the NumberOfEvents component', () => {
    // beforeEach already renders App
    const numberOfEventsElement = screen.getByTestId('number-of-events');
    expect(numberOfEventsElement).toBeInTheDocument();
  });

  // The simple 'renders the App component' test has been removed as it's now redundant.
});

// --- INTERGRATION TESTS ---
describe('<App /> integration', () => {
  test('filters events by city after user selection', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Wait for the initial data to load by looking for any list item
    // This ensures the app is ready before we interact with it.
    await screen.findAllByRole('listitem');

    // Find the city search input and type "Berlin"
    const citySearchInput = screen.getByPlaceholderText('Search for a city');
    await user.type(citySearchInput, 'Berlin');

    // Find the suggestion "Berlin, Germany" and click it.
    // We use `findByText` because it might take a moment to appear.
    // Find the suggestion list container specifically.
    const suggestionList = screen.getByTestId('suggestion-list');
    const berlinSuggestion = within(suggestionList).getByText('Berlin, Germany');
    await user.click(berlinSuggestion);

    // After the click, get the list of events currently on the page.
    // It should now ONLY contain Berlin events.
    const allRenderedEventItems = screen.getAllByRole('listitem');

    // Get the expected list of events directly from the API for comparison.
    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );

    // Assert that the number of rendered events matches the expected number.
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);

    // (Optional but good practice) Assert that each rendered event item
    // actually contains the text "Berlin, Germany". This confirms we're
    // not just getting the right number of items, but the right items.
    allRenderedEventItems.forEach(item => {
      expect(item.textContent).toContain('Berlin, Germany');
    });
  });
});