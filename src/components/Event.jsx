// src/components/Event.jsx

// This component represents a single event in the list.
// For now, it's just an empty list item.
const Event =( { event }) => {
    return (
        <li>
            <h2>{event.summary}</h2>
            <p>{event.start.dateTime}</p>
            <p>{event.location}</p>
            <button>Show Details</button>
        </li>
    );
}

export default Event;