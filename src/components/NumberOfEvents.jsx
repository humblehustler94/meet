// scr/components/NumberOfEvents create new file within components folder
// Earlier in the task I added 36 mock data 
// src/components/NumberOfEvents.jsx
import { useState } from "react";

const NumberOfEvents = () => {
  const [value, setValue] = useState('32');

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <div data-testid="number-of-events">
      <input
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default NumberOfEvents;