const express = require("express");
const router = express.Router();
const fs = require("fs");
const db = require("../db/db.json");


// The following API routes should be created:
//  GET `/api/notes` - Should read the `db.json`
//  file and return all saved notes as JSON.

router.get("/notes", (req, res) => {
    console.log(req.query);
    const noteData = fs.readFileSync("./db/db.json", "utf-8");
    res.json(JSON.parse(noteData));
});

//  POST `/api/notes` - Should receive a new note to save on
// the request body, add it to the `db.json` file, and then
//  return the new note to the client.

router.post("/notes", (req, res) => {
    console.log(req.body);
    // 1) read what's currently in db.json
    var noteData = fs.readFileSync("./db/db.json", "utf-8");
    // The line above seems to be running from the server, because it should be a ../ first, instead of ./
    // 2) need to push to the db.json
    console.log(noteData);
    var notesArray = JSON.parse(noteData);
    req.body.id = notesArray.length + 1;
    notesArray.push(req.body);
    notesArray = JSON.stringify(notesArray);
    fs.writeFileSync("./db/db.json", notesArray);
    res.json(true);
});

//  DELETE `/api/notes/:id` - Should receive a query parameter
// containing the id of a note to delete.This means you 'll
// need to find a way to give each note a unique `id` when it'
//  s saved.In order to delete a note, you 'll need to read all
// notes from the `db.json` file, remove the note with the given
// `id` property, and then rewrite the notes to the `db.json` file.

router.delete("/notes/:id", (req, res) => {
    console.log("req.params in delete route");
    console.log(req.params);
    var noteData = fs.readFileSync("./db/db.json", "utf-8");
    var notesArray = JSON.parse(noteData);
    notesArray.filter((note) => {
        console.log(req.params.id);
        console.log(note.id);
        if (note.id !== parseInt(req.params.id)) {
            return true
        };
    });
    notesArray = JSON.stringify(notesArray);
    console.log(notesArray);
    fs.writeFileSync("./db/db.json", notesArray);
    res.json(true);
});

module.exports = router;