Feature: Show and Hide Event Details
  As a user
  I want to be able to show and hide event details
  So that I can manage the information on my screen and focus on what's important to me.

Scenario: Event details are collapsed by default
  Given the app has loaded a list of events
  When the user views the event list
  Then all event details should be hidden by default.

Scenario: User can expand an event to see its details
  Given there is a collapsed event in the list
  When the user clicks the "Show Details" button for that event
  Then the details for that event should become visible.

Scenario: User can collapse an event to hide its details
  Given an event's details are currently visible
  When the user clicks the "Hide Details" button for that event
  Then the details for that event should be hidden.