import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  
  test('Event details are collapsed by default', ({ given, when, then }) => {
    given('the app has loaded a list of events', () => {

    });

    when('the user views the event list', () => {

    });

    then('all event details should be hidden by default.', () => {

    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('there is a collapsed event in the list', () => {

    });

    when(/^the user clicks the "(.*)" button for that event$/, (arg0) => {

    });

    then('the details for that event should become visible.', () => {

    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('an event\'s details are currently visible', () => {

    });

    when(/^the user clicks the "(.*)" button for that event$/, (arg0) => {

    });

    then('the details for that event should be hidden.', () => {

    });
  });
});