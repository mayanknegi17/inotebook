const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodb$oyoy'

// ROUTE 1: Create a user useing POST "/api/auth/createuser" does not require auth
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be 5 characters').isLength({ min: 5 }),
], async (req, res)=>{
    // If there are errors, return bed requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with the same email
    try {
        let user = await User.findOne({email: req.body.email});
        // console.log(user);
        if (user){
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        // Create a user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);


        res.json({authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
    

    // res.json({"nice" : "Nice"})
    
    // .then(user => res.json(user))
    // .catch(err=> {console.log(err)
    // res.json({error: "Please enter a unique value", message: err.message})})
    
})

// ROUTE 2: Authenticate a user useing POST "/api/auth/login"  no login require
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res)=>{
    // If there are errors, return bed requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body; 
    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);

        res.json({authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})

// ROUTE 3: Get loggedin user details using:  POST "/api/auth/getuser"  login require
router.post('/getuser', fetchuser, async (req, res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})


module.exports = router