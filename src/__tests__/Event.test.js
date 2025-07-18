// src/Event.test.js Step 1: Create a new file within src folder
// Step 2: Write the first failing test (The Red Step)
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
        // Note: Using start.dateTime is more user-centeric than 'created'
        expect(screen.getByText(testEvent.start.dateTime)).toBeInTheDocument();
    });

    test('renders event location', () => {
        render(<Event event={testEvent} />);
        expect(screen.getByText(testEvent.location)).toBeInTheDocument();
    });

    test('renders event details button with the title "Show Details"', () => {
        render(<Event event={testEvent} />);
        expect(screen.getByRole('button', { name: /show details/i })).toBeInTheDocument();
    });
});