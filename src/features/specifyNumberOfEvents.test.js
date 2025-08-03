import { loadFeature, defineFeature} from 'jest-cucumber';

// 1. Loads the Gherkin feature file
const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

// 2. Define the feature with an empty 'test' block
defineFeature(feature, test => {

    test('A default number of events is displayed initially', ({ given, when, then}) => {
        given('the user has not specified a number of events', () => {

        });

        when('the user opens the event list page', () => {

        });

        then(/^(\d+) events should be displayed by default.$/, (arg0) => {

        });
    });

    test('User can change the number of events displayed', ({ given, when, then}) => {
        given('the user is on the event list page', () => {

        });

        when(/^the user specifies they want to see "(.*)" events$/, (arg0) => {

        });

        then(/^the event list should update to display exactly "(.*)" events.$/, (arg0) =>{

        });
    });
});