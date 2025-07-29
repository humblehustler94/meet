// NEW IMPORTS
import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api'; // New import line added 

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

    // Scenario 2 - NEW IMPLEMENTATION 
    test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
        // NEW VARIABLES SCOPED TO THIS SCENARIO TO KEEP TESTS ISOLATED
        let AppComponent;
        let CitySearchDOM;

        given('the main page is open', () => {
            AppComponent = render(<App />);

        });

        when('user starts typing in the city textbox', async () => {
            const user = userEvent.setup();
            CitySearchDOM = AppComponent.getByTestId('city-search');
            const citySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(citySearchInput, "Berlin");

        });

        then('the user should receive a list of cities (suggestions) that match what they\'ve typed', () => {
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionListItems).toHaveLength(2);

        });
    });

    
    // Scenario 3 - NEW IMPLEMENTATION
    test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
        // NEW VARIABLES SCOPED TO THIS SCENARIO
        let AppComponent;
        let citySearchInput;
        let suggestionListItems;

        given('user was typing "Berlin" in the city textbox', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            // Using getByTestId to correctly find the component 
            const CitySearchDOM = AppComponent.getByTestId('city-search');
            citySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(citySearchInput, "Berlin");
        });

        and('the list of suggested cities is showing', () => {
            const CitySearchDOM = AppComponent.getByTestId('city-search');
            suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionListItems).toHaveLength(2);
        });

        when('the user selects a city (e.g., "Berlin, Germany") from the list', async () => {
            const user = userEvent.setup();
            // Clicks the first item in the suggestion list
            await user.click(suggestionListItems[0]);
        });

        then('their city should be changed to that city (i.e., "Berlin, Germany")', () => {
            // Asserts that input value now reflects the selection
            expect(citySearchInput.value).toBe('Berlin, Germany');
        });

        and('the user should receive a list of upcoming events in that city', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            const allEvents = await getEvents();

            // Filter the mock events to find only those in the selected city
            const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value)
            expect(EventListItems).toHaveLength(berlinEvents.length);

        });
    });

});