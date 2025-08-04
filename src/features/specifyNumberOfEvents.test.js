// ADD NEW IMPORTS -- React, Testing Library, and your App.
import { loadFeature, defineFeature} from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import App from '../App';


// 1. Loads the Gherkin feature file
const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

// 2. Define the feature with an empty 'test' block
defineFeature(feature, test => {

    // --- Scenario 1: A default number of events is displayed initially ---
    test('A default number of events is displayed initially', ({ given, when, then}) => {
        let AppDOM;

        given('the user has not specified a number of events', () => {
            //  THIS STEP JUST REQUIRES RENDERING THE APP IN ITS DEFAULT STATE
            const { container } = render(<App />);
            AppDOM = container;
        });

        when('the user opens the event list page', async () => {
            // WE NEED TO WAIT FOR THE EVENTS TO BE LOADED ASYNCHRONOUSLY 
            await waitFor(() => {
                const eventList = within(AppDOM).queryAllByRole('listitem');
                expect(eventList.length).toBeGreaterThan(0);
            });
        });

        then(/^(\d+) events should be displayed by default.$/, (eventCount) => {
            const eventList = within(AppDOM).queryAllByRole('listitem');
            // THE MOCK DATA PROVIDES 32 EVENTS, SO WE EXPECT THAT MANY
            expect(eventList.length).toBe(parseInt(eventCount));
        });
    });

    // --- Scenario 2: User can change the number of events displayed ---
    test('User can change the number of events displayed', ({ given, when, then}) => {
        let AppDOM;


        given('the user is on the event list page', () => {
            const { container } = render(<App />);
            AppDOM = container;
        });

        when(/^the user specifies they want to see "(.*)" events$/, async (number) => {
            const user = userEvent.setup();
            // Find the NumberOfEvents component container
            const NumberOfEventsDOM = within(AppDOM).queryByTestId('number-of-events');
            // Find the input box within that container
            const numberInput = within(NumberOfEventsDOM).queryByRole('textbox');

            // Simulate the user clearing the box and typing a new number
            await user.clear(numberInput);
            await user.type(numberInput, number);
        });

        then(/^the event list should update to display exactly "(.*)" events.$/, (number) =>{
            const eventList = within(AppDOM).queryAllByRole('listitem');
            expect(eventList.length).toBe(parseInt(number));

        });
    });
});