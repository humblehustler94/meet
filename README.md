# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

------------------------------
# App Key Features 1-6
## Feature 1: Filter Events By City - User Story <br/>
- Scenario 1: <br/>
As a new or general user, <br/>I should be able to see all upcoming events by default, <br/>So that I can get a broad overview of what's available before narrowing my search.<br/>

- Scenario 2: <br/>
As a user searching for a location, <br/>I should be able to see a list of city suggestions as I type, <br/>So that I can quickly and accurately find the city I'm interested in. <br/>

- Scenario 3: <br/>
As a user,<br/>I should be able to select a city from the suggested list,<br/>So that the event list updates to show only events in that specific location.<br/>
------------------------------
## Gherking Syntax - Given-When-Then <br/>
Feature: Filter Events by City<br/>
As a user <br/> I want to be able to filter events by city <br/> So that I can find events relevant to my location.<br/>
<br/>

- Scenario: User sees event from all cities by default<br/>
Given the user has not searched for any city<br/> When the user opens the app <br/> Then the user should see a list of upcoming events from all cities.<br/>

- Scenario: User sees city suggestions while searching<br/>
Given the main event list is visible<br/> When the user starts typing a city name into the search box<br/> Then the user should see a list of cities that match the search term.<br/>

- Scenario: User can select a city to filter events<br/>
Given the user is presented with a list of city suggestions<br/> When the user selects a city from the list<br/> Then the event list should be updated to show events only from that selected city.<br/>
------------------------------
## Feature 2: Show/Hide Event Details <br/>
- Scenario 1: <br/>
As a user, <br/> I should be able to see a collapsed, high-level overview of all events by default, <br/> So that I can quickly scan the list without being overwhelmed by details. <br/>

- Scenario 2: <br/>
As a user, <br/> I should be able to expand a specific event, <br/> So that I can view its full details and decide if I want to attend.<br/>

- Scenario 3: <br/>
As a user, <br/> I should be able to collapse an event's details, <br/>So that I can hide information I'm no longer interested in and make the list easier to navigate. <br/>
------------------------------
## Gherkin Syntax - Given-When-Then <br/>
Feature: Show and Hide Event Details <br/>
As a user<br/> I want to be able to show and hide event details<br/> So that I can manage the information on my screen and focus on what's important to me.<br/>

- Scenario: Event details are collapsed by default <br/>
Given the app has loaded a list of events<br/> When the user views the event list<br/> Then all event details should be hidden by default.<br/>

- Scenario: User can expand an event to see its details <br/>
Given there is a collapsed event in the list<br/> When the user clicks the "Show Details" button for that event<br/> Then the details for that event should become visible.<br/>

- Scenario: User can collapse an event to hide its details<br/>
Given an event's details are currently visible<br/> When the user clicks the "Hide Details" button for that event<br/> Then the details for that event should be hidden.<br/>

------------------------------
## Feature 3: Specify Number of Events <br/>
- Scenario 1: <br/>
As a user,<br/> I should be able to see a default number of events (e.g., 32) when I first load the app, <br/> So that I have a meaningful amount of content to browse without feeling overwhelmed. <br/>

- Scenario 2: <br/>
As a user, <br/> I should be able to specify the number of events I want to see, <br/> So that I can customize the view to match my browsing preference. <br/>
------------------------------
## Gherkin Syntax - Given-When-Then <br/>
Feature: Specify Number of Events <br/>
As a user<br/> I want to control how many events are displayed<br/> So that I can customize the view to my preference.<br/>

- Scenario: A default number of events is displayed initially <br/>
Given the user has not specified a number of events<br/> When the user opens the event list page<br/> Then 32 events should be displayed by default.<br/>

- Scenario: User can change the number of events displayed<br/>
Given the user is on the event list page<br/> When the user specifies they want to see "10" events<br/> Then the event list should update to display exactly "10" events.<br/>

------------------------------
## Feature 4: Use the App when Offline <br/>
- Scenario 1: <br/>
As a user, <br/> I should be able to see the last set of events I viewed when I'm offline, <br/> So that I can still access event information without an active internet.<br/>

- Scenario 2: <br/>
As a user, <br/> I should be able to see an error message when I try to filter events while offline, <br/> So that I understand why the data isn't updating and know that I need to reconnect.<br/>
------------------------------
## Gherkin Syntax - Given-When-Then <br/>
Feature: Use the App When Offline<br/>
As a user<br/> I want to be able to access event data even without an internet connection<br/> So that the app is still useful when my connectivity is poor or unavailable.<br/>

- Scenario: App shows cached data when the user is offline<br/>
Given the user has previously opened the app and loaded data and the user's device is now offline<br/> When the user re-opens the app<br/> Then the user should see the cached list of events from their last session.<br/>

- Scenario: App shows an error when trying to perform a new search while offline<br/>
Given the user is offline and the user is viewing the cache event list<br/> When the user attempts to change the city filter or number of events<br/> Then the app should display an error message indicating that an internet connection is required.<br/>

------------------------------
## Feature 5: Add an App Shortcut to the Home Screen <br/>
- Scenario 1: <br/>
As a frequent user, <br/> I should be able to install the meet app on my device's home screen,<br/> So that I can access it quickly and conveniently like a native application. <br/>

------------------------------
## Gherkin Syntax - Given-When-Then <br/>
Feature: Add App Shortcut to Home Screen<br/>
As a frequent user<br/> I want to add a shortcut for the app on my device's home screen<br/> So that I can access it quickly and conveniently.<br/>

- Scenario: User can install the app shortcut (PWA)<br/>
Given the user is using a browser that supports Progressive Web Apps (PWA)<br/> When the user selects the "Add to Home Screen" option in their browser<br/> Then the meet app icon should be added to their device's home screen.<br/>

------------------------------
## Feature 6: Displaying Charts visualizing Event Details <br/>
- Scenario 1: <br/>
As a user, <br/> I should be able to see a chart visualizing the number of upcoming events per city,<br/> So that I can easily understand event distribution and discover popular locations.<br/>

------------------------------
## Gherkin Syntax - Given-When-Then <br/>
Feature: Display Charts for Event Visualization<br/>
As a user<br/> I want to see visual data about the events<br/> So that I can quickly understand trends and distributions.<br/>

- Scenario: A chart shows the number of upcoming events per city<br/>
Given there are upcoming events in multiple cities<br/> When the user navigates to the data visualization view<br/> Then a chart should be displayed showing the number of events for each city.<br/>
