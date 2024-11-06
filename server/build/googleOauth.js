"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const { google } = require('googleapis');
dotenv_1.default.config();
exports.auth = new google.auth.OAuth2(process.env.PUBLIC_GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.PUBLIC_GOOGLE_OAUTH_REDIRECT_URL);
