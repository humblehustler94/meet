// src/components/EventList.jsx
import Event from "./Event";

// 1. Destructure the 'events' prop from the component's arguments
// Refactor to fix error --> Add the default prop value here!
const EventList = ({ events = [] }) => {
    // We return a <ul> because our modern test is looking for a role of "list"
    return (
        <ul id="event-list">
            {/*
            2. Map over the 'events' array. For each 'event' object in the array,
            render one <Event /> component
            3. We also add 'key' prop, which is crucial for React's rendering performance.
            The event's ID is the perfect unique key. Since our mock data doesn't 
            have IDs yet, we can use the index for now, but we'll change this later.
            */}
            {/* Refactor this code line below to use event.id. 
            Key prop now uses the stable event.id instead of the potentially unstable index. */}
            {events.map(event => <Event key={event.id} event={event} />)}
        </ul> // added id="event-list" to the <ul> tag.
    );
}

export default EventList;