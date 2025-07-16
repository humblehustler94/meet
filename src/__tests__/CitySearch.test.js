// src/__test__/CitySearch.test.js

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // <--- 1. IMPORT new code line added
import CitySearch from '../components/CitySearch';

describe('<CitySearch /> component', () => {
    // Test 1 : Already exsists and passes
    test('renders text input', () => {
        render(<CitySearch />);
        const cityTextBox = screen.getByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    // --- Test 2 New failing test to add ---
    test('suggestions list is hidden by default', async () => {
        render(<CitySearch />);
        // Use queryByRole because the element might not be there (which what we want)
        const suggestionList = screen.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });


    // --- Test 3: (New test) check that suggestions appear on click/focus
    test('renders a list of suggestions when city textbox gain focus', async () => {
        // 1. Setup
        const user = userEvent.setup();
        render(<CitySearch />);

        // 2. Action
        const cityTextBox = screen.getByRole('textbox');
        await user.click(cityTextBox);

        // 3. Assertion
        // Use getByRole because we now Except the list to be there 
        const suggestionList = screen.getByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });
});