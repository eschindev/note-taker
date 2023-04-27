const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
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
    readFromFile('./db/db.json')
    .then(
        (data) => res.json(JSON.parse(data))
    );
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to /api/notes`);
    if (req.body) {
        const { title, text } = req.body;

        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note saved');
    } else {
        res.errored('Saving note failed');
    }
});

app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received to /api/notes`);
    // implement delete notes here
});













app.get('/*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);