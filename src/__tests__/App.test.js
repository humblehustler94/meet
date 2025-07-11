// src/__tests__/App.test.js (Refactored with beforeEach)

import { render, screen } from '@testing-library/react';
import App from '../App';

// Note: We don't need 'import React from "react";' because of our modern Babel setup!

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

  // The simple 'renders the App component' test has been removed as it's now redundant.
});