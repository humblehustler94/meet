// NEW IMPORTS
import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
// Note: Event though getEvents isn't used directly here,
// it's the source of the mock data for the App component.

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
    //  NEW VARIABLE 
    let AppComponent; // Declared here to be accessible in both when() and then()


    // Scenario 1
    test('When user hasn\'t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        given('user hasn\'t searched for any city', () => {
            // This step is intentionally left blank as it's the default state.

        });

        when('the user opens the app', () => {
            // NEW IMPLEMENTATION
            AppComponent = render(<App />);

        });

        // NEW IMPLEMENTATION
        then('the user should see the list of all upcoming events.', async () => {
            // `container.firstChild` is used to get the main App DOM element
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            // waitFor is used to handle the asynchronous nature of fetching events
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });

        });
    });

    // Scenario 2 (THIS REMAIN UNIMPLEMENTED FOR NOW)
    test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
        given('the main page is open', () => {

        });

        when('user starts typing in the city textbox', () => {

        });

        then('the user should receive a list of cities (suggestions) that match what they\'ve typed', () => {

        });
    });

    // Scenario 3 (THIS REMAINS UNIMPLEMENTED FOR NOW)
    test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
        given('user was typing "Berlin" in the city textbox', () => {

        });

        and('the list of suggested cities is showing', () => {

        });

        when('the user selects a city (e.g., "Berlin, Germany") from the list', () => {

        });

        then('their city should be changed to that city (i.e., "Berlin, Germany")', () => {

        });

        and('the user should receive a list of upcoming events in that city', () => {

        });
    });

});