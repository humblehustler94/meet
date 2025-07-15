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
        const suggestionList = screen.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

    test('renders a list of suggestions when city textbox is clicked', async () => {
        // 1. set up user instance
        const user = userEvent.setup();
        render(<CitySearch />);

        // 2. Find the textbox
        const cityTextBox = screen.getByRole('textbox');

        // 3. Simulate a click
        await user.click(cityTextBox);

        // 4. Assert that the suggestion list is now visible 
        const suggestionList = screen.getByRole('list');
        expect(suggestionList).toBeInTheDocument();
    });
});