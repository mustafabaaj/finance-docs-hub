
const express = require('express')
const app = express();
const PORT = 3000
const auth = require('./googleAuth')
const { readEmails, } = require('./emailUtils/email-operations')
const processXlsxFiles = require('./excelUtils/excelCombiner');

const scopes = [
    'https://www.googleapis.com/auth/gmail.readonly',
].join(' ')


app.get('/', (req, res) => {
    const url = auth.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    })
    res.send(`<a href="${url}">Auth with Google</a>`)
})

app.get('/api/sessions/oauth/google', async (req, res) => {
    const { code } = req.query
    const { tokens } = await auth.getToken(code);
    auth.setCredentials(tokens)
    try {
        await readEmails(auth); 
        processXlsxFiles(); 
        res.redirect('/');
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
})


app.listen(PORT, () => {
    console.log("Server is running")
})