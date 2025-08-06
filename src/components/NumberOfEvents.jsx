// src/components/NumberOfEvents.
import { useState } from "react"; // <-- Added this import

// We no longer need useState in this component
const NumberOfEvents = ({ setNumberOfEvents, setErrorAlert }) => {
  const [value, setValue] = useState(32);

  // This handler function will now update the state in the parent App component
  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue); // Update the local state for the input field

    let errorText;
    // Perform validation
    if (isNaN(newValue) || newValue <= 0) {
      errorText = "Please enter a valid positive number.";
      setErrorAlert(errorText);
    } else {
      // If valid, clear the error and update the parent state
      errorText = "";
      setErrorAlert(errorText);
      setNumberOfEvents(newValue);
    }
  };

  return (
    <div data-testid="number-of-events">
      <label>Number of Events: </label>
      <input
        type="text"
        value={value} // <-- CHANGE defaultValue to value
        onChange={handleChange}
        data-testid="number-of-events-input" // The required attribute for the test
      />
    </div>
  );
};

export default NumberOfEvents;