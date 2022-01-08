const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router();

const fetchuser = require('../middleware/fetchuser');

// ROUTE 1: Create a user useing POST "/api/auth/createuser" does not require auth
router.post('/fetchallnotes', fetchuser, async (req, res)=>{
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);
})

module.exports = router