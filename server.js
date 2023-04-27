const express = require('express');
const path = require('path');
const { readFromFile, writeToFile, readAndAppend} = require('./helpers/fsUtils.js');

const notes = require('./db/db.json');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to get /api/notes`);
    // implement get notes here
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to /api/notes`);
    // implement post notes here
});

app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received to /api/notes`);
    // implement delete notes here
})













app.get('/*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);