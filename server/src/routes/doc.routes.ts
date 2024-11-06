const express = require('express');
import {
  getGoogleAuthLink,
  googleAuth,
  getUser,
  logOutUser,
  getLabels,
} from '../controllers/google.controller';

const googleFetchsRouter = express.Router();

googleFetchsRouter.get('/googleAuth', getGoogleAuthLink);
googleFetchsRouter.get('/api/sessions/oauth/google', googleAuth);
googleFetchsRouter.get('/api/user/profile', getUser);
googleFetchsRouter.get('/api/user/labels', getLabels);
googleFetchsRouter.post('/api/logout', logOutUser);

module.exports = googleFetchsRouter;
