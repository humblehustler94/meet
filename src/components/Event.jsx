// src/components/Event.jsx
import { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li>
      <h2>{event.summary}</h2>
      <p>{event.start.dateTime}</p>
      <p>{event.location}</p>
      
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {showDetails && (
        <div className="details">
          <h3>About this event:</h3>
          <p>{event.description}</p>
        </div>
      )}
    </li>
  );
}

export default Event;