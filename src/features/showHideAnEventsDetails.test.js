// --- ADD NEW IMPORTS ---
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  // VARIBALES TO HOLD COMPONENT AND DOM ELEMENTS ACROSS STEPS
  let AppDOM;
  let EventListDOM;

  // -- Scenario 1: Event details are collapsed by default
  test('Event details are collapsed by default', ({ given, when, then }) => {
    given('the app has loaded a list of events', async () => {
      const { container } = render(<App />);
      AppDOM = container;
      // Wait for event list to appear
      await waitFor(() => {
        // corrected query
        EventListDOM = AppDOM.querySelector('#event-list');
        expect(EventListDOM).toBeInTheDocument();
      });

    });

    when('the user views the event list', () => {
      // This step doesn't require action, as the setup is done in 'given'

    });

    then('all event details should be hidden by default.', () => {
      // Find the first event's details. If it's hidden, we assume all are.
      const eventDetails = within(EventListDOM).queryByText(/About this event:/);
      expect(eventDetails).not.toBeInTheDocument();

    });
  });

  // -- Scenario 2: User can expand an event to see its details --
  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('there is a collapsed event in the list', async () => {
      const { container } = render(<App />);
      AppDOM = container;
      await waitFor(() => {
        // corrected query
        EventListDOM = AppDOM.querySelector('#event-list');
        expect(EventListDOM).toBeInTheDocument();
      });
      // Confirm details are initially hidden
      const eventDetails = within(EventListDOM).queryByText(/About this event:/);
      expect(eventDetails).not.toBeInTheDocument();

    });

    when(/^the user clicks the "(.*)" button for that event$/, async (buttonText) => {
      const user = userEvent.setup();
      const showDetailsButton = within(EventListDOM).getAllByText(buttonText)[0];
      await user.click(showDetailsButton);
    });

    then('the details for that event should become visible.', () => {
      const eventDetails = within(EventListDOM).queryByText(/About this event:/);
      expect(eventDetails).toBeInTheDocument();
    });
  });

  // -- Scenario 3: User can collapse an event to hide its details
  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('an event\'s details are currently visible', async () => {
      const user = userEvent.setup();
      const { container } = render(<App />);
      AppDOM = container;
      await waitFor(() => {
        // corrected query
        EventListDOM = AppDOM.querySelector('#event-list');
        expect(EventListDOM).toBeInTheDocument();
      });
      // Expand the first event to set up the state
      const showDetailsButton = within(EventListDOM).getAllByText("Show Details")[0];
      await user.click(showDetailsButton);
      // Confirm details are now visible
      const eventDetails = within(EventListDOM).queryByText(/About this event:/);
      expect(eventDetails).toBeInTheDocument();

    });

    when(/^the user clicks the "(.*)" button for that event$/, async (buttonText) => {
      const user = userEvent.setup();
      const hideDetailsButton = within(EventListDOM).getAllByText(buttonText)[0];
      await user.click(hideDetailsButton);
    });

    then('the details for that event should be hidden.', () => {
      const eventDetails = within(EventListDOM).queryByText(/About this event:/);
      expect(eventDetails).not.toBeInTheDocument();

    });
  });
});