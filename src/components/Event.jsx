// src/components/Event.jsx

import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Step 2: Format the date for better readability.
  // We use event.start.dateTime as it's more relevant than event.created.
  const eventDate = new Date(event.start.dateTime).toUTCString();

  return (
    // The main container with the 'event' class
    <li className="event">
      
      {/* Step 1 & 3: Add specific class names and reorder elements */}
      <p className="summary">{event.summary}</p>
      <p className="location">{event.location}</p>
      <p className="start-time">{eventDate}</p>

      {/* Conditionally render the details section */}
      {showDetails && (
        <div className="details">
          <h3>About this event:</h3>
          <p>{event.description}</p>
        </div>
      )}

      {/* Step 1: Add the className to the button */}
      <button
        className="details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'hide details' : 'show details'}
      </button>

    </li>
  );
};

export default Event;