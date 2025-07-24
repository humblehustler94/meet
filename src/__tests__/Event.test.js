// src/Event.test.js Step 1: Create a new file within src folder
// Step 2: Write the first failing test (The Red Step)
import userEvent from '@testing-library/user-event'; // Add import to the top of the list
import { render, screen } from '@testing-library/react';
import Event from '../components/Event';
import mockData from '../mock-data';

describe('<Event /> component', () => {
    const testEvent = mockData[0]; // Use the first event from our mock data

    test('renders event title', () => {
        render(<Event event={testEvent} />);
        expect(screen.getByText(testEvent.summary)).toBeInTheDocument();
    });

    test('renders event start time', () => {
        render(<Event event={testEvent} />);

        const formattedDate = new Date(testEvent.start.dateTime).toUTCString();

        const dateElement = screen.getByText(formattedDate);
        // Note: Using start.dateTime is more user-centeric than 'created'
        expect(dateElement).toBeInTheDocument();
    });

    test('renders event location', () => {
        render(<Event event={testEvent} />);
        expect(screen.getByText(testEvent.location)).toBeInTheDocument();
    });

    test('renders event details button with the title "Show Details"', () => {
        render(<Event event={testEvent} />);
        expect(screen.getByRole('button', { name: /show details/i })).toBeInTheDocument();
    });

    test('by default, event details section should be hidden', () => {
        render(<Event event={testEvent} />);
        const details = screen.queryByText(testEvent.description);
        expect(details).not.toBeInTheDocument();
    });

    test('shows the details section when the user clicks on the "show details" button', async () => {
        const user = userEvent.setup();
        render(<Event event={testEvent} />);

        const showDetailsButton = screen.getByRole('button', { name: /show details/i });
        await user.click(showDetailsButton);

        const details = screen.getByText('About this event:');
        expect(details).toBeInTheDocument();
    });

    test('hides the details section when the user clicks on the "hide details" button', async () => {
        const user = userEvent.setup();
        render(<Event event={testEvent} />);
        const showDetailsButton = screen.getByRole('button', { name: /show details/i });
        await user.click(showDetailsButton); // Open it first
        const hideDetailsButton = screen.getByRole('button', { name: /hide details/i });
        await user.click(hideDetailsButton); // Then close it
        // Look for the heading, which should now be gone
        const details = screen.queryByText('About this event:');
        expect(details).not.toBeInTheDocument();

    });

});