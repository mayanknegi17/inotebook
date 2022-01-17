const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get all notes using: get  "/api/notes/fetchallnotes" does not require auth
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

// ROUTE 2: Add A New Note using: Post  "/api/notes/addnote" does not require auth
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be 5 characters').isLength({ min: 5 }),
], async (req, res)=>{
    try {
        const {title, description, tag} = req.body;
        // If there are errors, return bed requests
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note ({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
    
})

// ROUTE 3: Update an exiting  Note using: Put  "/api/notes/updatenote" does not require auth
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) {newNote.title = title};
        if (title) {newNote.description = description};
        if (title) {newNote.tag = tag};

        // Find the note to be updated and update it
        let note = await Note.findById(req.param.id);
        if(!note) {return res.status(404).send("Not Found")}
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

// ROUTE 4: Delete an exiting  Note using: Put  "/api/notes/deletenote" login require
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.param.id);
        if(!note) {return res.status(404).send("Not Found")}

        // Allow deletion  only if user owns this note
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Note has been deleted", note: note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

module.exports = router