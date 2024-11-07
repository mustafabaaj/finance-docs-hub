const express = require('express');
import {
  getGoogleAuthLink,
  googleAuth,
  getUser,
  logOutUser,
  getLabels,
  getDesfasuratoareWithLabel,
  handleMergeDocuments,
} from '../controllers/google.controller';

const googleFetchsRouter = express.Router();

googleFetchsRouter.get('/googleAuth', getGoogleAuthLink);
googleFetchsRouter.get('/api/sessions/oauth/google', googleAuth);
googleFetchsRouter.get('/api/user/profile', getUser);
googleFetchsRouter.get('/api/user/labels', getLabels);
googleFetchsRouter.get('/api/documents/label', getDesfasuratoareWithLabel);
googleFetchsRouter.get('/api/documents/merge', handleMergeDocuments);
googleFetchsRouter.post('/api/logout', logOutUser);

module.exports = googleFetchsRouter;
