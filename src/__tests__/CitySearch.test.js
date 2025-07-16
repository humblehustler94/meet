// src/__test__/CitySearch.test.js (Refactor for cleanliness)

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // <--- 1. IMPORT new code line added
import CitySearch from '../components/CitySearch';

describe('<CitySearch /> component', () => {
    // --- Add this beforeEach Block ---
    // It will render the citySearch component before each test
    beforeEach(() => {
        render(<CitySearch />);
    });

    // -- Test 1 : Renders text input ---
    test('renders text input', () => {
        // render(<CitySearch />); call is now removed from here
        const cityTextBox = screen.getByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    // --- Test 2 : Suggestions list is hidden by default ---
    test('suggestions list is hidden by default', async () => {
        // render(<CitySearch />);
        // Use queryByRole because the element might not be there (which what we want)
        const suggestionList = screen.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });


    // --- Test 3: Renders a list of suggestions when city textbox gains focus ---
    test('renders a list of suggestions when city textbox gain focus', async () => {
        const user = userEvent.setup();
       // render(<CitySearch />);
        
        const cityTextBox = screen.getByRole('textbox');
        await user.click(cityTextBox);

        const suggestionList = screen.getByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });
});