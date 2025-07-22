// src/App.jsx (Updated to pass the test)

import { useState, useEffect } from 'react'
import './App.css'
import NumberOfEvents from './components/NumberOfEvents';
import CitySearch from './components/CitySearch'; 
import EventList from './components/EventList'; 
import { getEvents} from './api'; 

/*
// Note: The getAccessToken import might need adjustment based on your file structure.
// If your auth-server folder is at the root, '../auth-server/handler' is correct from src/.
// import { getAccessToken } from '../auth-server/handler'; 
*/

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [events, setEvents] = useState([]); // Will hold the full list of events from the API
  const [ numberOfEvents, setNumberOfEvents] = useState(32); // The number of events to display

  // Effect for fetching event data on initial component mount
  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      setEvents(allEvents);
    };
    fetchData();
  },[]); // Empty dependency array ensures this runs only once 

  // Effect for handling the GOOGLE OAUTH redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      getAccessToken(code);
    }
  }, []);

  const getAccessToken = async (code) => {
    try {
      const getAccessTokenEndpoint = 'https://z6j7n76eya.execute-api.eu-central-1.amazonaws.com/dev/api/token';
      const response = await fetch(getAccessTokenEndpoint + '/' + code);
      const { access_token } = await response.json();
      setAccessToken(access_token);
    } catch (error) {
      console.error("Error getting access token", error);
    }
  };

  const handleLoginClick = async () => {
    try {
      const getAuthURLEndpoint = 'https://z6j7n76eya.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url';
      const response = await fetch(getAuthURLEndpoint);
      const { authUrl } = await response.json();
      window.location.href = authUrl; // Redirect to Google Login
    } catch (error) {
      console.error("Error fetch auth URL", error);
    }
  };

  return (
    <div className="App" role="main">
      <h1>Meet App</h1>
      {/* 1. RENDER the CitySearch component here to make the test pass */}
      <CitySearch />
      <NumberOfEvents setNumberOfEvents={setNumberOfEvents} /> {/* Added this line to return */}

      {accessToken ? (
        <div>
          <h2>You are signed in!</h2>
        </div>
      ) : (
        <div>
          <h2>Please sign in to see upcoming events.</h2>
          <button className="google-btn" onClick={handleLoginClick}>
            Sign in with Google
          </button>
        </div>
      )}

      
      {/* REPLACE THE OLD <ul> WITH THE NEW <EventList /> COMPONENT */}
      {/* 2. PASS the 'events' state down to the EventList component */}
      <EventList events={events.slice(0, numberOfEvents)} />

    </div>
  );
}

export default App;