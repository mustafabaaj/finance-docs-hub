const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const LABEL_NAME = 'SameDay Ramburs';
const auth = require('../googleAuth');
const currentDate = new Date();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');


async function readEmails(auth, res) {
  const gmail = google.gmail({ version: 'v1', auth });

  await gmail.users.labels.list({ userId: 'me' }, async (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.labels;
    const label = labels.find((lable) => lable.name === LABEL_NAME);

    if (!label) {
      console.log(`Label "${LABEL_NAME}" not found.`);
      return;
    }

    const labelId = label.id;
    console.log(`Label ID for "${LABEL_NAME}": ${labelId}`);

    await gmail.users.messages.list(
      {
        userId: 'me',
        labelIds: [labelId],
        maxResults: '30',
        q: `after:2024/${currentMonth}/01 before:2024/${currentMonth}/30`,
      },
      (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const messages = res.data.messages;
        if (!messages || messages.length === 0) {
          console.log('No messages found with the specified label.');
          return;
        }
        messages.forEach((message) => getEmail(message.id, gmail));
      }
    );
  });
  return;
}

async function getEmail(emailId, gmail) {
  const response = await gmail.users.messages.get({
    id: emailId,
    userId: 'me',
  });
  const email = response.data;
  const subject = email.payload.headers.find((e) => e.name == 'Subject').value;
  const from = email.payload.headers.find((e) => e.name == 'From').value;
  const parts = email.payload.parts;

  if (parts) {
    
    parts.forEach(part => {
      if (part.filename && part.body && part.body.attachmentId) {
        console.log(`Found attachment: ${part.filename}`);
        getAttachment(auth, emailId, part);
      }
    });
    
  }

  return `From: ${from} with subject ${subject} `;
}

function getAttachment(auth, messageId, part) {
    const folderPath = path.join(
      __dirname,
      '../excelUtils/desfasuratoareSameday'
    );
    const filePath = path.join(
      folderPath,
      part.filename.split(/-qualio/)[0] + '.xlsx'
    );
    const gmail = google.gmail({ version: 'v1', auth });
    gmail.users.messages.attachments.get(
      {
        userId: 'me',
        messageId: messageId,
        id: part.body.attachmentId,
      },
      (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const attachmentData = res.data.data;

        // Decode base64url encoded string and save the attachment
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
