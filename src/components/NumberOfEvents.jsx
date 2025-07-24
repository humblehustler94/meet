// src/components/NumberOfEvents.jsx

// We no longer need useState in this component
const NumberOfEvents = ({ setNumberOfEvents, setErrorAlert }) => {
  
  // This handler function will now update the state in the parent App component
  const handleChange = (event) => {
    const value = event.target.value;
    
    // Optional but recommended: add some basic validation
    if (isNaN(value) || value <= 0) {
      // You can also pass an setErrorAlert prop to show a message to the user
      if (setErrorAlert) setErrorAlert("Number must be greater than 0");
    } else {
      if (setErrorAlert) setErrorAlert("");
      setNumberOfEvents(value);
    }
  };

  return (
    <div data-testid="number-of-events">
      <label>Number of Events: </label>
      <input
        type="text"
        defaultValue="32"
        onChange={handleChange}
        data-testid="number-of-events-input" // The required attribute for the test
      />
    </div>
  );
};

export default NumberOfEvents;