import axios from 'axios';
import { auth } from '../googleOauth';
import { google } from 'googleapis';
const { readEmails } = require('../emailUtils/email-operations');
const processXlsxFiles = require('../excelUtils/excelCombiner');
const now = new Date();
const currentDate = now.toISOString().split('T')[0];

const scopes = [
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/gmail.readonly',
].join(' ');

export function getGoogleAuthLink(req: any, res: any) {
  try {
    const url = auth.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
    res.status(200).send({
      status: 'success',
      url: url,
      message: 'Google Auth URL Generated successfully',
    });
  } catch (err) {
    console.error('Error generating Google Auth link:', err);
    res.status(500).send({
      status: 'error',
      message: 'Failed to generate authentication link',
    });
  }
}

export async function googleAuth(req: any, res: any) {
  const { code } = req.query;
  try {
    const { tokens } = await auth.getToken(code);
    const { access_token, refresh_token, expiry_date } = tokens;
    auth.setCredentials(tokens);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: 3600 * 1000,
    });

    res.redirect('http://localhost:3000');
  } catch (err) {
    console.error('Error during Google authentication:', err);
    res.status(500).send('Authentication failed');
  }
}

export async function getUser(req: any, res: any) {
  const accessToken = req.cookies.access_token;
  try {
    if (!accessToken) {
      return res.status(401).send('Unauthorized');
    }

    auth.setCredentials({ access_token: accessToken });
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const user = {
      name: response.data.name,
      image: response.data.picture,
      email: response.data.email,
    };

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching user');
  }
}

export async function logOutUser(req: any, res: any) {
  res.clearCookie('access_token', {
    httpOnly: true,
    sameSite: 'Strict',
  });
  res.status(200).send({ message: 'Logged out successfully' });
}

export async function getLabels(req: any, res: any) {
  const gmail = google.gmail({ version: 'v1', auth });

  try {
    const labelList = await gmail.users.labels.list({ userId: 'me' });
    const labels = labelList.data.labels;

    res.status(200).send({
      status: 'success',
      labels,
      message: 'Google Auth URL Generated successfully',
    });
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: 'Failed to fetch labels',
      error,
    });
  }
}

export async function getDesfasuratoareWithLabel(req: any, res: any) {
  try {
    if (!auth) {
      return res
        .status(400)
        .json({ message: 'Authentication failed. Please log in again.' });
    }
    await readEmails(auth);

    res
      .status(200)
      .json({ message: 'Download process completed successfully.' });
  } catch (error) {
    console.error('An error occurred:', error);

    if (error === 'Authentication failed. Please log in again.') {
      res.status(400).json({ message: error });
    } else if (error === 'File processing failed. Please try again later.') {
      res.status(500).json({ message: error });
    } else {
      res.status(500).json({
        message: 'An unexpected error occurred. Please try again later.',
      });
    }
  }
}

export async function handleMergeDocuments(req: any, res: any) {
  try {
    const filePath = await processXlsxFiles();
    console.log(filePath);
    res
      .status(200)
      .json({ message: 'Merging process completed successfully.' });
  } catch (error) {
    res.status(500).send('An error occurred during file processing');
  }
}

module.exports = {
  getGoogleAuthLink,
  googleAuth,
  getUser,
  logOutUser,
  getLabels,
  getDesfasuratoareWithLabel,
  handleMergeDocuments,
};
