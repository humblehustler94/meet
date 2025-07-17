// src/api.js New file create for getEvents
import mockData from './mock-data';

/*
* @params {array} events
* @returns {array} 
*/

export const extractLocations = (events) => {
    const extractLocations = events.map((event) => event.location);
    const locations = [ ...new Set(extractLocations)];
    return locations;
};

export const getEvents = async () => {
    return mockData;
};