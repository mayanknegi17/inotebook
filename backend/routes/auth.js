const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');



// Create a user useing POST "/api/auth/". does not require auth
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be 5 characters').isLength({ min: 5 }),
], async (req, res)=> {
    // If there are errors, return bed requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with the same email
    try {
        let user = await User.findOne({email: req.body.email});
        if (user){
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
    } catch (error) {
        console.error(error.message);
    }
    

    // res.json({"nice" : "Nice"})
    
    // .then(user => res.json(user))
    // .catch(err=> {console.log(err)
    // res.json({error: "Please enter a unique value", message: err.message})})
    
})

module.exports = router