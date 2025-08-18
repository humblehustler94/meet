// src/__tests__/EventList.test.js

// NEW/UPDATED IMPORTS: within and waitFor are added for the integration test.
// App is also imported to be rendered in the new test.
import { render, screen, within, waitFor } from '@testing-library/react';
import { getEvents} from '../api';
import EventList from '../components/EventList';
import App from '../App'; // <-- Import the App component

// --- UNIT TESTS FOR EVENTLISTS ---
describe('<EventList /> component', () => {
    test('has an element with "list" role', () => { // --- Test Case 1 ---
        render(<EventList />); // 1. Render the component
        const listElement = screen.getByRole("list"); 
        expect(listElement).toBeInTheDocument();  
    });

    test('renders correct number of events', async () => { // --- Test Case 2 ---
        const allEvents = await getEvents();
        render(<EventList events={allEvents} />);
        const listItems = screen.getAllByRole("listitem");
        expect(listItems).toHaveLength(allEvents.length);
    });
});

// --- NEW INTEGRATION TEST SCOPE ---
describe('<EventList /> integration', () => {
    // new test from 4.5, refactored with modern best practices.
    test('renders a list of events when the app is mounted and rendered', async () => {
        // 1. Render the App component
        render(<App />);

        // 2. We need to wait for the events to be fetched and rendered asynchronously.
        // `findAllByRole` is the perfect tool for this. It waits up to 1000ms.
        // for elements with the role "listitem" to appear on screen.
        const eventListItems = await screen.findAllByRole('listitem');

        // 3. The mock API returns 32 events by default. We assert that the 
        // number of rendered list items matches this.
        expect(eventListItems.length).toBe(32);
    });

});