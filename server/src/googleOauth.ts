require('dotenv').config();
const { google } = require('googleapis');

export const auth = new google.auth.OAuth2(
  process.env.PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.PUBLIC_GOOGLE_OAUTH_REDIRECT_URL
);
