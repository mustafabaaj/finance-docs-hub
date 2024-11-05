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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var google = require('googleapis').google;
var fs = __importStar(require("fs"));
var path = require('path');
var LABEL_NAME = 'SameDay Ramburs';
var auth = require('../googleOauth');
var currentDate = new Date();
var currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
function readEmails(auth, res) {
    return __awaiter(this, void 0, void 0, function () {
        var gmail;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gmail = google.gmail({ version: 'v1', auth: auth });
                    return [4 /*yield*/, gmail.users.labels.list({ userId: 'me' }, function (err, res) { return __awaiter(_this, void 0, void 0, function () {
                            var labels, label, labelId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (err)
                                            return [2 /*return*/, console.log('The API returned an error: ' + err)];
                                        labels = res.data.labels;
                                        label = labels.find(function (lable) { return lable.name === LABEL_NAME; });
                                        if (!label) {
                                            console.log("Label \"".concat(LABEL_NAME, "\" not found."));
                                            return [2 /*return*/];
                                        }
                                        labelId = label.id;
                                        console.log("Label ID for \"".concat(LABEL_NAME, "\": ").concat(labelId));
                                        return [4 /*yield*/, gmail.users.messages.list({
                                                userId: 'me',
                                                labelIds: [labelId],
                                                maxResults: '30',
                                                q: "after:2024/9/01 before:2024/9/30",
                                            }, function (err, res) {
                                                if (err)
                                                    return console.log('The API returned an error: ' + err);
                                                var messages = res.data.messages;
                                                if (!messages || messages.length === 0) {
                                                    console.log('No messages found with the specified label.');
                                                    return;
                                                }
                                                messages.forEach(function (message) { return getEmail(message.id, gmail); });
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getEmail(emailId, gmail) {
    return __awaiter(this, void 0, void 0, function () {
        var response, email, subject, from, parts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gmail.users.messages.get({
                        id: emailId,
                        userId: 'me',
                    })];
                case 1:
                    response = _a.sent();
                    email = response.data;
                    subject = email.payload.headers.find(function (e) { return e.name == 'Subject'; }).value;
                    from = email.payload.headers.find(function (e) { return e.name == 'From'; }).value;
                    parts = email.payload.parts;
                    if (parts) {
                        parts.forEach(function (part) {
                            if (part.filename && part.body && part.body.attachmentId) {
                                console.log("Found attachment: ".concat(part.filename));
                                getAttachment(auth, emailId, part);
                            }
                        });
                    }
                    return [2 /*return*/, "From: ".concat(from, " with subject ").concat(subject, " ")];
            }
        });
    });
}
function getAttachment(auth, messageId, part) {
    var folderPath = path.join(__dirname, '../excelUtils/desfasuratoareSameday');
    var filePath = path.join(folderPath, part.filename.split(/-qualio/)[0] + '.xlsx');
    var gmail = google.gmail({ version: 'v1', auth: auth });
    gmail.users.messages.attachments.get({
        userId: 'me',
        messageId: messageId,
        id: part.body.attachmentId,
    }, function (err, res) {
        if (err)
            return console.log('The API returned an error: ' + err);
        var attachmentData = res.data.data;
        var data = Buffer.from(attachmentData, 'base64');
        fs.writeFile(filePath, data, function (err) {
            if (err) {
                console.error('Error saving attachment:', err);
            }
            else {
                console.log("Attachment ".concat(part.filename, " saved successfully."));
            }
        });
    });
}
module.exports = {
    getAttachment: getAttachment,
    readEmails: readEmails,
    getEmail: getEmail,
};
