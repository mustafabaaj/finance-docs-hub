"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var google_controller_1 = require("../controllers/google.controller");
var googleFetchsRouter = express.Router();
googleFetchsRouter.get('/', google_controller_1.getGoogleAuthLink);
googleFetchsRouter.get('/api/sessions/oauth/google', google_controller_1.processEmails);
module.exports = googleFetchsRouter;
