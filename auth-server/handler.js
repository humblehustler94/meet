'use strict';

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;

// Your specific Vercel URL has been added here.
const redirect_uris = [
  "https://meet-theta-five.vercel.app/"
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0] // This will now use your Vercel URL
);

module.exports.getAuthURL = async () => {
  /*
   *
   * Scopes array is passed to the `scope` option.
   *
   */
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};

// --- ADD NEW FUNCTION BELOW THIS LINE FOR TOKEN ---
module.exports.getAccessToken = async (event) => {
  // Decode the authorization code from the URL path parameter
  const code = decodeURIComponent(event.pathParameters.code);

  return new Promise((resolve, reject) => {
    /* Exchange authorization code for access token with a "callback" after the exchange,
    *  The callback in this case is an arrow function with the results as parameters: "error" and "response"
     */

    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      // Respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      // Handle error
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};


// --- ADD NEW FUNCTION BELOW THIS LINE FOR EVENTS ---
// --- Start of new code for STEP 3: INTERGRATE THE ACCESS TOKEN IN YOUR NEW getCalendarEvents() Function. ---
module.exports.getCalendarEvents = async (event) => {

  // --- FIX: ADDED THIS BLOCK TO HANDLE PRE-FLIGHT OPTIONS REQUESTS ---
  if(event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    };
  }
  // --- END OF FIX ---

  // The access_token will be passed in the path parameter
  // Get the access_token from the parameter
  const access_token = decodeURIComponent(event.pathParameters.access_token);

  // Set the credentials on the oAuth2Client
  oAuth2Client.setCredentials({ access_token });
  // -- End of new code for STEP 3 ---

  return new Promise((resolve, reject) => {
    // --- Start of STEP 4: CODE YOUR ASYNCHRONOUS LOGIC ---
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
    // --- END OF NEW CODE FOR STEP 4 ---

    // Your google Calendar API logic will go here

  })
  // --- Start of change for STEP 5 ---
    .then((results) => {
      // Respond with the events
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        // Extract the array of events from the GOOGLE API response and format it
        body: JSON.stringify({ events: results.data.items }),
      };
    })
    // --- End of STEP 5 ---
    // --- This is the error handling logic for STEP 6 ---
    .catch((error) => {
      // Handle error if promise is rejected
      return {
        statusCode: 500,
        // --- Fix: ADDED CORS HEADERS TO THE ERROR RESPONSE ---
        headers: {
          'Access-Control-Allow-Origins': '*',
          'Access-Control-Allow-Credentials': true,
        },
        // --- END OF FIX ---
        body: JSON.stringify(error),
      };
    });
};