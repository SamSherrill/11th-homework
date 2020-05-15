const express = require("express");
const path = require("path");
const router = express.Router();

// The following HTML routes should be created:

// GET `/notes` - Should return the `notes.html` file.
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});


// GET `*` - Should return the `index.html` file
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
