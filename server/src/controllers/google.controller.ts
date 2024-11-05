import { auth } from '../googleOauth';
const { readEmails } = require('../emailUtils/email-operations');
const processXlsxFiles = require('../excelUtils/excelCombiner');

const scopes = ['https://www.googleapis.com/auth/gmail.readonly'].join(' ');

export function getGoogleAuthLink(req: any, res: any) {
  const url = auth.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.send(`<a href="${url}">Auth with Google</a>`);
}

export async function processEmails(req: any, res: any) {
  const { code } = req.query;
  const { tokens } = await auth.getToken(code);
  auth.setCredentials(tokens);
  try {
    await readEmails(auth);
    processXlsxFiles();
    res.redirect('/');
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
}

module.exports = { getGoogleAuthLink, processEmails };
