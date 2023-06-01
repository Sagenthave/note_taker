const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/404.html'))
);

// Function for old notes

// Function to add new notes

// Function to delete notes

//Function to update existing notes