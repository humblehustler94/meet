// src/__tests__/NumberOfEvents.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('contains an element with the role of "textbox"', () => {
    render(<NumberOfEvents />);
    const textbox = screen.getByRole('textbox');
    expect(textbox).toBeInTheDocument();
  });

  test('default value of the input field is 32', () => {
    render(<NumberOfEvents />);
    const textbox = screen.getByRole('textbox');
    expect(textbox).toHaveValue('32');
  });

  test('value changes accordingly when a user types in it', async () => {
    const user = userEvent.setup();
    render(<NumberOfEvents />);
    const textbox = screen.getByRole('textbox');

    // Simulate typing '10' after clearing the input
    await user.clear(textbox);
    await user.type(textbox, '10');
    
    expect(textbox).toHaveValue('10');
  });
});