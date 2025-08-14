// src/App.jsx
import  { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert'; // <-- Added new import to App.jsx file


import { useState, useEffect } from 'react';
import './App.css';
import NumberOfEvents from './components/NumberOfEvents';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import CityEventsChart from './components/CityEventsChart'; // <-- Added new import
import { getEvents, extractLocations } from './api';


function App() {
  // All authentication-related state and functions have been removed.
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState(""); // <--  1. STATE ADDED
  const [errorAlert, setErrorAlert] = useState("");
  // ADD NEW STATE
  const [warningAlert, setWarningAlert] = useState("");

  // This useEffect now only focuses on fetching data.
 useEffect(() => {
  // This logic checks the online status and sets the warning message.
  if(navigator.onLine) {
    setWarningAlert("");
  } else {
    setWarningAlert("You are offline. The displayed event list may not be up to date.");
  }
  
  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities"
    ? allEvents
    : allEvents.filter(event => event.location === currentCity);
  setEvents(filteredEvents.slice(0, numberOfEvents)); // Filter and slice before setting state
  setAllLocations(extractLocations(allEvents));
  };

  fetchData();
 },[currentCity, numberOfEvents]); // the dependency array is update

 // --- ADD THIS DEBUGGING LOG ---
//console.log("App.jsx State:", {events, allLocations});

  // Filtering logic remains the same.
  /*const filteredEvents = currentCity === "See all cities"
    ? events
    : events.filter(event => event.location === currentCity); 
    */

  return (
    <div className="App" role="main">
      {/* 2. ALERT CONTAINER ADDED --- ADD THIS NEW BLOCK ---  */}
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null} {/*<-- Added this new line of code */}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
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
      {/* --- ADD THIS NEW BLOCK */}
      <div className="charts-container" data-testid="charts-container">
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>
      {/* --- END OF BLOCK --- */}

      {/* The conditional auth JSX has been removed. */}

      <EventList events={events} />
    </div>
  );
}

export default App;