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

// --- Function for getAuthUrl ---
module.exports.getAuthURL = async () => {
  /**
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

        oAuth2Client.getToken(code,(error, response) => {
            if(error) {
                return reject(error);
            }
            return resolve(response);
        });
    })
    .then ((results) => {
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
    .catch ((error) => {
        // Handle error
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    });
};

// --- Step 2 in 4.3 Task:  ADD NEW FUNCTION SKELETON BELOW THIS LINE for getCalendarEvents ---
module.exports.getCalendarEvents = async (event) => {
    return new Promise((resolve, reject) => {
        // The logic to get the calendar events will be added here in the next step.
        // For now, it's an empty promise
    })
    .then((results) => {
        // This .then() block will handle the successful response
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({events: results.data.items}),
        };
    })
    .catch((error) =>{
        // This .catch() block will handle any errors
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    });
};
