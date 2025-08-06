// src/__tests__/NumberOfEvents.test.js

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

  // Test 1: Check for the textbox role.
  test('contains an element with the role of "textbox"', () => {
    // Provide a mock function as the prop. An empty function is fine here.
    render(<NumberOfEvents setNumberOfEvents={() => { }} setErrorAlert={() => { }} />);
    const textbox = screen.getByRole('textbox');
    expect(textbox).toBeInTheDocument();
  });

  // Test 2: Check the default value.
  test('default value of the input field is 32', () => {
    // Also provide the mock prop here.
    render(<NumberOfEvents setNumberOfEvents={() => { }} setErrorAlert={() => { }} />);
    const textbox = screen.getByRole('textbox');
    // Using `toHaveValue` on an input with `defaultValue` is correct.
    expect(textbox).toHaveValue('32');
  });

  // Test 3: Check if the prop function is called correctly on change.
  // This is the most important change.
  test('calls setNumberOfEvents when the input value changes', async () => {
    const user = userEvent.setup();
    // 1. Create a Jest mock function to act as our spy.
    const mockSetNumberOfEvents = jest.fn();

    // 2. Render the component and pass the mock function as the prop.
    render(<NumberOfEvents 
      setNumberOfEvents={mockSetNumberOfEvents}
      setErrorAlert={() => { }}
      />);
    const textbox = screen.getByRole('textbox');

    // 3. Simulate the user typing "10". We don't need to clear first
    // because `user.type` will append. To be more robust, we can clear.
    await user.clear(textbox);
    await user.type(textbox, '10');

    // 4. Assert that our mock function was called with the correct value.
    // This is the crucial assertion.
    expect(mockSetNumberOfEvents).toHaveBeenCalled();
    expect(mockSetNumberOfEvents).toHaveBeenCalledWith('10');
  });
});