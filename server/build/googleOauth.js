"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
require('dotenv').config();
var google = require('googleapis').google;
exports.auth = new google.auth.OAuth2(process.env.PUBLIC_GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.PUBLIC_GOOGLE_OAUTH_REDIRECT_URL);
