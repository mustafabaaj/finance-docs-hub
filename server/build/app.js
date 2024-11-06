"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const cookieParser = require('cookie-parser');
const googleFetchsRouter = require('./routes/doc.routes');
const app = (0, express_1.default)();
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express_1.default.json());
app.use('/', googleFetchsRouter);
module.exports = app;
