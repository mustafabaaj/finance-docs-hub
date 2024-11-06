"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { google } = require('googleapis');
const fs = __importStar(require("fs"));
const path = require('path');
const LABEL_NAME = 'SameDay Ramburs';
const auth = require('../googleOauth');
const currentDate = new Date();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
function readEmails(auth, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const gmail = google.gmail({ version: 'v1', auth });
        yield gmail.users.labels.list({ userId: 'me' }, (err, res) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                return console.log('The API returned an error: ' + err);
            const labels = res.data.labels;
            const label = labels.find((lable) => lable.name === LABEL_NAME);
            if (!label) {
                console.log(`Label "${LABEL_NAME}" not found.`);
                return;
            }
            const labelId = label.id;
            console.log(`Label ID for "${LABEL_NAME}": ${labelId}`);
            yield gmail.users.messages.list({
                userId: 'me',
                labelIds: [labelId],
                maxResults: '30',
                q: `after:2024/9/01 before:2024/9/30`,
            }, (err, res) => {
                if (err)
                    return console.log('The API returned an error: ' + err);
                const messages = res.data.messages;
                if (!messages || messages.length === 0) {
                    console.log('No messages found with the specified label.');
                    return;
                }
                messages.forEach((message) => getEmail(message.id, gmail));
            });
        }));
        return;
    });
}
function getEmail(emailId, gmail) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield gmail.users.messages.get({
            id: emailId,
            userId: 'me',
        });
        const email = response.data;
        const subject = email.payload.headers.find((e) => e.name == 'Subject').value;
        const from = email.payload.headers.find((e) => e.name == 'From').value;
        const parts = email.payload.parts;
        if (parts) {
            parts.forEach((part) => {
                if (part.filename && part.body && part.body.attachmentId) {
                    console.log(`Found attachment: ${part.filename}`);
                    getAttachment(auth, emailId, part);
                }
            });
        }
        return `From: ${from} with subject ${subject} `;
    });
}
function getAttachment(auth, messageId, part) {
    const folderPath = path.join(__dirname, '../excelUtils/desfasuratoareSameday');
    const filePath = path.join(folderPath, part.filename.split(/-qualio/)[0] + '.xlsx');
    const gmail = google.gmail({ version: 'v1', auth });
    gmail.users.messages.attachments.get({
        userId: 'me',
        messageId: messageId,
        id: part.body.attachmentId,
    }, (err, res) => {
        if (err)
            return console.log('The API returned an error: ' + err);
        const attachmentData = res.data.data;
        const data = Buffer.from(attachmentData, 'base64');
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                console.error('Error saving attachment:', err);
            }
            else {
                console.log(`Attachment ${part.filename} saved successfully.`);
            }
        });
    });
}
module.exports = {
    getAttachment,
    readEmails,
    getEmail,
};
