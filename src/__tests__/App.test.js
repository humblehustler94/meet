// src/__tests__/App.test.js

import { render, screen } from '@testing-library/react';
import App from '../App';

// Note: We don't need 'import React from "react";' because of our modern Babel setup!

describe('<App /> component', () => {
  // Test Case 1: The component renders without crashing
  test('renders the App component', () => {
    render(<App />);
    // This test implicitly passes if render() doesn't throw an error.
    // It's a good "smoke test" to have.
  });

  // Test Case 2: The list of events is rendered
  test('renders list of events', () => {
    render(<App />);
    
    // Find the element that has the role of a 'list'. This is more user-centric
    // than searching for an ID. We assume your event list is a <ul> or <ol>.
    const eventList = screen.getByRole('list'); 
    
    expect(eventList).toBeInTheDocument();
  });
});