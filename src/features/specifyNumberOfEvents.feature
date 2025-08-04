Feature: Specify Number of Events
  As a user
  I want to control how many events are displayed
  So that I can customize the view to my preference.

Scenario: A default number of events is displayed initially
  Given the user has not specified a number of events
  When the user opens the event list page
  Then 32 events should be displayed by default.

Scenario: User can change the number of events displayed
  Given the user is on the event list page
  When the user specifies they want to see "10" events
  Then the event list should update to display exactly "10" events.