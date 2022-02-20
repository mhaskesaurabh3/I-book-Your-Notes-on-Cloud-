const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const secretKey=process.env.SECRETWORD
const JWT_SECRET = secretKey;
const jwt = require('jsonwebtoken');
const fetchuser = require('./middleware/fetchuser');

// Create a user using : POST "/api/auth/createuser". Doesn't require auth. Dosen't require login

router.post('/createuser', [
    body('name', 'Name should be atleast 3 characters').isLength({ min: 3 }),
    body('email', 'Email should be unique').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {
    let success= false;
    // If there are errors then you will get bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({success, errors: errors.array() });
    }

    // Check whether the user with the same email exists
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success=false;
            return res.status(400).json({success, error: "The user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        // res.json(user);
        success=true;
        res.json({success, authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})

// Authenticate a user using : POST "/api/auth/login". Doesn't require auth. Dosen't require login
router.post('/login', [
    body('email', 'Email should be unique').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
    let success= false;
    // If there are errors then you will get bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    
    const  { email, password } = req.body;

    // Check whether the user with the same email exists
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ error: "Please enter the valid credentials" })
        }
        const passwordComapare=  await bcrypt.compare(password, user.password);
           if (!passwordComapare) {
               success= false;
            return res.status(400).json({success,  error: "Please enter the valid credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        // res.json(user);
        success =true; 
        res.json({success, authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})

// Get details of  logged in  user using : POST "/api/auth/getuser". Require login
router.post('/getuser', fetchuser , async (req, res) => {
   
    try {
        userId= req.user.id;
        const user= await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})



module.exports = router