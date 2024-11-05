const express = require('express');
import {
  getGoogleAuthLink,
  processEmails,
} from '../controllers/google.controller';

const googleFetchsRouter = express.Router();

googleFetchsRouter.get('/', getGoogleAuthLink);
googleFetchsRouter.get('/api/sessions/oauth/google', processEmails);

module.exports = googleFetchsRouter;
