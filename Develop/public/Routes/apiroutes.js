const fs = require("fs");
const path = require("path");
const express = require("express");
const { response, json } = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// DEFAULT: LANDING PAGE
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
// GO TO THE NOTES FROM THE LANDING PAGE
router.get('/notes', (req, res) => {
res.sendFile(path.join(__dirname, '../notes.html'))
    });
// SHOW ALL DATA SHOW ON THE LEFT HAND COLUMN
router.get('/api/notes', (req, res) => {
    fs.readFile(path.join (__dirname, '../../db/db.json'), "utf-8", (error, data) => {
        if (error) {
            console.error(error); //SHOW ERROR 
        }
        res.json(JSON.parse(data));
    })
});

// SAVE NOTES WRITTEN ON PAGE
router.post('/api/notes', (req, res) => {
    // whatever is being typed will be stored in this variable
    const {title, text} = req.body;
    fs.readFile(path.join (__dirname, '../../db/db.json'), "utf-8", (error, data) => {
        if (error) {
            console.error(error); //SHOW ERROR 
        }
        const savenotes = JSON.parse(data);
        const newnote = {
            id: uuidv4(), title, text
        };
        savenotes.push(newnote);
        fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(savenotes), (error) => {
            if (error) {
                console.error(error); //SHOW ERROR
            };
            res.json(savenotes);
        });
    });
});

// DELETE NOTES 
router.delete("/api/notes/:id", (req, res) => {
    const {id} = req.params;
    fs.readFile(path.join (__dirname, '../../db/db.json'), "utf-8", (error, data) => {
        if (error) {
            console.error(error); //SHOW ERROR 
        };
        const savenotes = JSON.parse(data);
        const deletednotes = savenotes.filter((note) => note.id !== id);
        fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(deletednotes), (error) => {
            if (error) {
                console.error(error); //SHOW ERROR
            };
            res.sendStatus(200);
        });
    });
});

// EDIT EXISTING NOTES

module.exports = router;