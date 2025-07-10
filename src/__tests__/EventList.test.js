// src/__tests__/EventList.test.js

import { render, screen } from '@testing-library/react';
import EventList from '../components/EventList';

describe('<EventList /> component', () => {
    // Test Case 1: (Already exists and passes)
    test('has an element with "list" role', () => {
        render(<EventList />); // 1. Render the component
        const listElement = screen.getByRole("list"); // 2. Select the element by its role
        expect(listElement).toBeInTheDocument();  // 3. Assert that element in the document
    });

    // Test Case 2: (This is the new test you are adding)
    test('renders correct number of events', () => {
        // 1. Define mock data: an array with 4 objects
        const mockEvents = [{}, {}, {}, {}];

        // 2. Render the component, passing the mock data as a prop
        render(<EventList events={mockEvents} />);

        // 3. Find all elements with the role "listitem" (which are <li> tags)
        const listItems = screen.getAllByRole("listitem");

        // 4. Assert that the number of found items matches the mock data length
        expect(listItems).toHaveLength(4);
    });
});

