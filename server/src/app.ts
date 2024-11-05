import express from 'express';
const googleFetchsRouter = require('./routes/doc.routes');
const app = express();

app.use(express.json());
app.use('/', googleFetchsRouter);

module.exports = app;
