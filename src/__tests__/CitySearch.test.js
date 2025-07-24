// src/__tests__/CitySearch.test.js (Correctly Structured)
// Refactoring -- Adding new describe block for integration tests (Red Phase = Failing Test)

import { render, screen, within } from '@testing-library/react'; // 1. Add 'within' to imports
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';
import App from '../App'; // 2. Import the App component

// --- UNIT TESTS ---
describe('<CitySearch /> component', () => {
    // --- Test for the edge case where the prop is missing ---
    // This test lives at the top level of the describe block.
    test('does not crash when allLocations prop is not provided', async () => {
        const user = userEvent.setup();
        render(<CitySearch />); // This test has its own render call.

        const cityTextBox = screen.getByRole('textbox');
        await user.type(cityTextBox, "a");

        const suggestionListItems = screen.getAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(1);
        expect(suggestionListItems[0]).toHaveTextContent('See all cities');
    });

    // --- This nested describe block groups all tests that need the prop ---
    describe('when allLocations prop is provided', () => {
        let allLocations;
        let setCurrentCityMock;

        beforeAll(async () => {
            const allEvents = await getEvents();
            allLocations = extractLocations(allEvents);
        });

        // This beforeEach only applies to tests inside THIS describe block.
        beforeEach(() => {
            setCurrentCityMock = jest.fn();
            render(<CitySearch allLocations={allLocations} setCurrentCity={setCurrentCityMock} />);
        });

        test('renders text input', () => {
            const cityTextBox = screen.getByRole('textbox');
            expect(cityTextBox).toBeInTheDocument();
            expect(cityTextBox).toHaveClass('city');
        });

        test('suggestions list is hidden by default', () => {
            const suggestionList = screen.queryByRole('list');
            expect(suggestionList).not.toBeInTheDocument();
        });

        test('renders a list of suggestions when city textbox gains focus', async () => {
            const user = userEvent.setup();
            const cityTextBox = screen.getByRole('textbox');
            await user.click(cityTextBox);
            const suggestionList = screen.getByRole('list');
            expect(suggestionList).toBeInTheDocument();
            expect(suggestionList).toHaveClass('suggestions');
        });

        test('updates list of suggestions correctly when user types in the city textbox', async () => {
            const user = userEvent.setup();
            const cityTextBox = screen.getByRole('textbox');
            await user.type(cityTextBox, "Berlin");
            const suggestions = allLocations.filter((location) => {
                return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
            });
            const suggestionListItems = screen.getAllByRole('listitem');
            expect(suggestionListItems).toHaveLength(suggestions.length + 1);
            for (let i = 0; i < suggestions.length; i += 1) {
                expect(suggestionListItems[i]).toHaveTextContent(suggestions[i]);
            }
        });

        test('renders the suggestion text in the textbox upon clicking on a suggestion', async () => {
            const user = userEvent.setup();
            const cityTextBox = screen.getByPlaceholderText('Search for a city');
            await user.type(cityTextBox, "Berlin");
            const BerlinGermanySuggestion = screen.getByText('Berlin, Germany');
            await user.click(BerlinGermanySuggestion);

            expect(cityTextBox).toHaveValue('Berlin, Germany');

            expect(setCurrentCityMock).toHaveBeenCalledWith('Berlin, Germany');
        });
    });
});

// --- INTEGRATION TESTS ---
// 3. Add the new describe block for integration tests
describe('<CitySearch /> integration', () => {

    test('renders a list of suggestions when the app is rendered', async () => {
        const user = userEvent.setup();
        render(<App />);

        // Use the more specific query for the input box
        const cityTextBox = screen.getByPlaceholderText('Search for a city');
        await user.click(cityTextBox);

        // Get the expected locations from the API
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        // --- FIX THIS ---
        // 1. First, find the suggestion list container by its test ID
        const suggestionList = screen.getByTestId('suggestion-list');

        // 2. Then, use `within` to search for list items ONLY inside the container
        const suggestionListItems = within(suggestionList).getAllByRole('listitem');

        // 3. This assertion will now work correctly 
        expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
});