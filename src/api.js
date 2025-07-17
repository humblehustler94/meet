// src/api.js New file create for getEvents
import mockData from './mock-data';

/*
* @params {array} events
* @returns {array} 
*/

export const extractLocations = (events) => {
    // Use .map() to create a new array of just the location strings 
    const extractLocations = events.map((event) => event.location);

    // Use a Set to get only the unique locations, then spread it back into an array
    const locations = [...new Set(extractLocations)];
    return locations;
};

/*
* This function is holding async keyword for future development
 * when it will be fetching events from the real API
*/

export const getEvents = async () => {
    // In a test environment, it returns mock data.
    // In the future. it will fetch from the Google Calendar API
    return mockData;
};