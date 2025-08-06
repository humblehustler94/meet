// src/App.jsx
import  { InfoAlert, ErrorAlert } from './components/Alert'; // <-- Added new import to App.jsx file


import { useState, useEffect } from 'react';
import './App.css';
import NumberOfEvents from './components/NumberOfEvents';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import { getEvents, extractLocations } from './api';


function App() {
  // All authentication-related state and functions have been removed.
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState(""); // <--  1. STATE ADDED
  const [errorAlert, setErrorAlert] = useState("");

  // This useEffect now only focuses on fetching data.
  useEffect(() => {
 
    const fetchData = async () => {
      const allEvents = await getEvents();
      setAllLocations(extractLocations(allEvents));
      setEvents(allEvents);
    };
    fetchData();
  }, []);

  // Filtering logic remains the same.
  const filteredEvents = currentCity === "See all cities"
    ? events
    : events.filter(event => event.location === currentCity);

  return (
    <div className="App" role="main">
      {/* 2. ALERT CONTAINER ADDED --- ADD THIS NEW BLOCK ---  */}
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null} {/*<-- Added this new line of code */}
      </div>
      {/* -------- END OF BLOCK --------- */}


      <h1>Meet App</h1>

      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert} // <-- 3. PROP PASSED
      />
      <NumberOfEvents 
      setNumberOfEvents={setNumberOfEvents}
      setErrorAlert={setErrorAlert} // <-- Add this Prop here
      />

      {/* The conditional auth JSX has been removed. */}

      <EventList events={filteredEvents.slice(0, numberOfEvents)} />
    </div>
  );
}

export default App;