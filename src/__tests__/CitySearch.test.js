// src/__test__/CitySearch.test.js

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // <-- 1. IMPORT new line added to file 
import CitySearch from '../components/CitySearch';

describe('<CitySearch /> component', () => {
    test('renders text input', () => { 
        render(<CitySearch />); // 1.
        const cityTextBox = screen.getByRole('textbox'); // 2.
        expect(cityTextBox).toBeInTheDocument(); // 3.
        expect(cityTextBox).toHaveClass('city');
    });

    test('renders a list of suggestions when city textbox is clicked', async () => {
        // 1. Set up the user instance
        const user = userEvent.setup();
        render(<CitySearch />);

        // 2. Find the input element by its role
        // We use getByRole because we EXPECT it to be there.
        // 2. Find the textbox
        const cityTextBox = screen.getByRole('textbox');

        // 3. Assert that the textbox is in the document AND has the correct class
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
        // 3. Simulate a click
        await user.click(cityTextBox);

        // 4. Assert that the suggestion list is now visible
        const suggestionList = screen.getByRole('list');
        expect(suggestionList).toBeInTheDocument();
    });
});