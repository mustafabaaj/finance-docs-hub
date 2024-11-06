import express from 'express';
const cors = require('cors');
const cookieParser = require('cookie-parser');
const googleFetchsRouter = require('./routes/doc.routes');
const app = express();

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use('/', googleFetchsRouter);

module.exports = app;
