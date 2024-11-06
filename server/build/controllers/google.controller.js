"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleAuthLink = getGoogleAuthLink;
exports.googleAuth = googleAuth;
exports.getUser = getUser;
exports.logOutUser = logOutUser;
exports.getLabels = getLabels;
const axios_1 = __importDefault(require("axios"));
const googleOauth_1 = require("../googleOauth");
const googleapis_1 = require("googleapis");
const { readEmails } = require('../emailUtils/email-operations');
const processXlsxFiles = require('../excelUtils/excelCombiner');
const scopes = [
    'openid',
    'email',
    'profile',
    'https://www.googleapis.com/auth/gmail.readonly',
].join(' ');
function getGoogleAuthLink(req, res) {
    try {
        const url = googleOauth_1.auth.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
        });
        res.status(200).send({
            status: 'success',
            url: url,
            message: 'Google Auth URL Generated successfully',
        });
    }
    catch (err) {
        console.error('Error generating Google Auth link:', err);
        res.status(500).send({
            status: 'error',
            message: 'Failed to generate authentication link',
        });
    }
}
function googleAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { code } = req.query;
        try {
            const { tokens } = yield googleOauth_1.auth.getToken(code);
            const { access_token, refresh_token, expiry_date } = tokens;
            googleOauth_1.auth.setCredentials(tokens);
            res.cookie('access_token', access_token, {
                httpOnly: true,
                maxAge: 3600 * 1000,
            });
            res.redirect('http://localhost:3000');
        }
        catch (err) {
            console.error('Error during Google authentication:', err);
            res.status(500).send('Authentication failed');
        }
        // try {
        //   await readEmails(auth);
        //   processXlsxFiles();
        //   res.redirect('/');
        // } catch (error) {
        //   console.error('An error occurred:', error);
        //   res.status(500).send('An error occurred while processing your request.');
        // }
    });
}
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = req.cookies.access_token;
            if (!accessToken) {
                return res.status(401).send('Unauthorized');
            }
            googleOauth_1.auth.setCredentials({ access_token: accessToken });
            const response = yield axios_1.default.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const user = {
                name: response.data.name,
                image: response.data.picture,
                email: response.data.email,
            };
            res.status(200).json(user);
        }
        catch (err) {
            console.log(err);
            res.status(500).send('Error fetching user');
        }
    });
}
function logOutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie('access_token', {
            httpOnly: true,
            sameSite: 'Strict',
        });
        res.status(200).send({ message: 'Logged out successfully' });
    });
}
function getLabels(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const gmail = googleapis_1.google.gmail({ version: 'v1', auth: googleOauth_1.auth });
        try {
            const labelList = yield gmail.users.labels.list({ userId: 'me' });
            const labels = labelList.data.labels;
            res.status(200).send({
                status: 'success',
                labels,
                message: 'Google Auth URL Generated successfully',
            });
        }
        catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'Failed to fetch labels',
                error,
            });
        }
    });
}
module.exports = {
    getGoogleAuthLink,
    googleAuth,
    getUser,
    logOutUser,
    getLabels,
};
