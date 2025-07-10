// src/__tests__/EventList.test.js

import { render, screen } from '@testing-library/react';
import EventList from '../components/EventList';

describe('<EventList /> component', () => {
  test('has an element with "list" role', () => {
    // 1. Render the component
    render(<EventList />);
    
    // 2. Select the element by its role
    const listElement = screen.getByRole("list");

    // 3. Assert that the element is in the document
    expect(listElement).toBeInTheDocument();
  });
});