// src/components/EventList.jsx

const EventList = () => {
    // We return a <ul> because our modern test is looking for a role of "list"
    return (
        <ul id="event-list"></ul> // added id="event-list" to the <ul> tag.
    );
}

export default EventList;