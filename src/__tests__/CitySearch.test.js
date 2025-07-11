// src/__test__/CitySearch.test.js

import { render, screen } from '@testing-library/react';
import CitySearch from '../components/CitySearch';

describe('<CitySearch /> component', () => {
    test('renders text input', () => {
        // 1. Render the component 
        render(<CitySearch />);

        // 2. Find the input element by its role
        // We use getByRole because we EXPECT it to be there.
        const cityTextBox = screen.getByRole('textbox');

        // 3. Assert that the textbox is in the document AND has the correct class
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });
});