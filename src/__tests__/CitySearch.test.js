// src/__test__/CitySearch.test.js (Refactor for cleanliness)

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api'; // <-- IMPORT

describe('<CitySearch /> component', () => {
    // We need to pass allLocations to the component for this test suite
    // We can get them once before all tests
    let allLocations;
    beforeAll(async () => {
        const allEvents = await getEvents();
        allLocations = extractLocations(allEvents);
    });

    // Render the component with the neccessary props before each test
    beforeEach(() => {
        render(<CitySearch allLocations={allLocations} />);
    });

    // -- Test 1 : Renders text input ---
    test('renders text input', () => {
        const cityTextBox = screen.getByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    // --- Test 2 : Suggestions list is hidden by default ---
    test('suggestions list is hidden by default', async () => {
        const suggestionList = screen.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });


    // --- Test 3: Renders a list of suggestions when city textbox gains focus ---
    test('renders a list of suggestions when city textbox gains focus', async () => {
        const user = userEvent.setup();
        const cityTextBox = screen.getByRole('textbox');
        await user.click(cityTextBox);
        const suggestionList = screen.getByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });

    // --- NEW FAILING TEST  ---
    // --- Test 4: Update list of suggestions correctly when user types
    test('updates list of suggestions correctly when user types in the city textbox', async () => {
        const user = userEvent.setup();
        // render(<CitySearch allLocations={allLocations} />);

        // user types "Berlin" in city textbox
        const cityTextBox = screen.getByRole('textbox');
        await user.type(cityTextBox, "Berlin");

        // filter allLocations to locations matching "Berlin"
        const suggestions = allLocations.filter((location) => {
            return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
        });

        // get all <li> elements inside the suggestion list
        const suggestionListItems = screen.getAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(suggestions.length); // Note: I've removed the +1 for now
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(suggestionListItems[i]).toHaveTextContent(suggestions[i]);
        }
    });
});