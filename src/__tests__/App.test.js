// src/__tests__/App.test.js

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

// --- UNIT TESTS ---
describe('<App /> component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders the CitySearch component', () => {
    const citySearchElement = screen.getByTestId("city-search");
    expect(citySearchElement).toBeInTheDocument();
  });

  test('renders list of events', () => {
    const eventList = screen.getByRole('list');
    expect(eventList).toBeInTheDocument();
  });

  test('renders the NumberOfEvents component', () => {
    const numberOfEventsElement = screen.getByTestId('number-of-events');
    expect(numberOfEventsElement).toBeInTheDocument();
  });
});

// --- INTEGRATION TESTS ---
describe('<App /> integration', () => {
  test('filters events by city after user selection', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findAllByRole('listitem');
    const citySearchInput = screen.getByPlaceholderText('Search for a city');
    await user.type(citySearchInput, 'Berlin');
    const suggestionList = screen.getByTestId('suggestion-list');
    const berlinSuggestion = within(suggestionList).getByText('Berlin, Germany');
    await user.click(berlinSuggestion);
    const allRenderedEventItems = screen.getAllByRole('listitem');
    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    allRenderedEventItems.forEach(item => {
      expect(item.textContent).toContain('Berlin, Germany');
    });
  });

  // --- THIS IS THE NEWLY ADDED TEST ---
  test('the number of events rendered matches the number specified by the user', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findAllByRole('listitem');
    const numberOfEventsInput = screen.getByTestId('number-of-events-input');
    await user.type(numberOfEventsInput, "{backspace}{backspace}10");
    const allRenderedEventItems = screen.getAllByRole('listitem');
    expect(allRenderedEventItems.length).toBe(10);
  });
});