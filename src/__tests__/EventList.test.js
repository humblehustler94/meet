// src/__tests__/EventList.test.js

import { render, screen } from '@testing-library/react';
import { getEvents} from '../api'; // <-- 1. import getEvents into EventList.test.js file
import EventList from '../components/EventList';

describe('<EventList /> component', () => {
    // Test Case 1: (Already exists and passes)
    test('has an element with "list" role', () => {
        render(<EventList />); // 1. Render the component
        const listElement = screen.getByRole("list"); // 2. Select the element by its role
        expect(listElement).toBeInTheDocument();  // 3. Assert that element in the document
    });

    // Test Case 2: (This is the new test you are adding)
    test('renders correct number of events', async () => { //< -- 2. Make it async
        // 3. Fetch the mock data
        const allEvents = await getEvents();

        // 4. Render the component with the real mock data
        render(<EventList events={allEvents} />);

        const listItems = screen.getAllByRole("listitem");

        // 5. Assert against the length of the fetched data
        expect(listItems).toHaveLength(allEvents.length);
    });
});

