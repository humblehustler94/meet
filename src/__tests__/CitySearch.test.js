// src/__tests__/CitySearch.test.js (Correctly Structured)

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';

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
        beforeAll(async () => {
            const allEvents = await getEvents();
            allLocations = extractLocations(allEvents);
        });

        // This beforeEach only applies to tests inside THIS describe block.
        beforeEach(() => {
            render(<CitySearch allLocations={allLocations} />);
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
            const cityTextBox = screen.getByRole('textbox');
            await user.type(cityTextBox, "Berlin");
            const BerlinGermanySuggestion = screen.getByText('Berlin, Germany');
            await user.click(BerlinGermanySuggestion);
            expect(cityTextBox).toHaveValue('Berlin, Germany');
        });
    });
});