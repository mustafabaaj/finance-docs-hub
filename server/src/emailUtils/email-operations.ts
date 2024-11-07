const { google } = require('googleapis');
import * as fs from 'fs';
const path = require('path');
const LABEL_NAME = 'SameDay Ramburs Desfasuratoare';
const auth = require('../googleOauth');
const currentDate = new Date();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

async function readEmails(auth: any, res: any) {
  const gmail = google.gmail({ version: 'v1', auth });

  try {
    const res = await gmail.users.labels.list({ userId: 'me' });

    const labels = res.data.labels;
    const label = labels.find((lable: any) => lable.name === LABEL_NAME);

    if (!label) {
      console.log(`Label "${LABEL_NAME}" not found.`);
      return;
    }

    const labelId = label.id;
    console.log(`Label ID for "${LABEL_NAME}": ${labelId}`);

    const messagesRes = await gmail.users.messages.list({
      userId: 'me',
      labelIds: [labelId],
      maxResults: 30,
      q: `after:2024/9/01 before:2024/9/30`,
    });

    const messages = messagesRes.data.messages;
    if (!messages || messages.length === 0) {
      console.log('No messages found with the specified label.');
      return;
    }

    for (const message of messages) {
      await getEmail(message.id, gmail);
    }
  } catch (err) {
    console.error('The API returned an error:', err);
  }
  return;
}

async function getEmail(emailId: any, gmail: any) {
  const response = await gmail.users.messages.get({
    id: emailId,
    userId: 'me',
  });
  const email = response.data;
  const subject = email.payload.headers.find(
    (e: any) => e.name == 'Subject'
  ).value;
  const from = email.payload.headers.find((e: any) => e.name == 'From').value;
  const parts = email.payload.parts;

  if (parts) {
    for (const part of parts) {
      if (part.filename && part.body && part.body.attachmentId) {
        console.log(`Found attachment: ${part.filename}`);
        await getAttachment(auth, emailId, part, gmail); // Use await to wait for the async function
      }
    }
  }

  return `From: ${from} with subject ${subject} `;
}

async function getAttachment(auth: any, messageId: any, part: any, gmail: any) {
  const folderPath = path.join(
    __dirname,
    '../excelUtils/desfasuratoareSameday'
  );
  const filePath = path.join(
    folderPath,
    part.filename.split(/-qualio/)[0] + '.xlsx'
  );

  gmail.users.messages.attachments.get(
    {
      userId: 'me',
      messageId: messageId,
      id: part.body.attachmentId,
    },
    (err: any, res: any) => {
      if (err) return console.log('The API returned an error: ' + err);
      const attachmentData = res.data.data;

      const data = Buffer.from(attachmentData, 'base64');
      fs.writeFile(filePath, data, (err) => {
        if (err) {
          console.error('Error saving attachment:', err);
        } else {
          console.log(`Attachment ${part.filename} saved successfully.`);
        }
      });
    }
  );
}

module.exports = {
  getAttachment,
  readEmails,
  getEmail,
};
