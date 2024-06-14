
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const axios = require('axios');
const { check, validationResult } = require('express-validator');

router.post('/signup', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const newUser = new User({ email, secPass });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

router.post('/login', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } 
    const { email, password } = req.body;
    try {
        const data = await User.findOne({ email });
        if (!data) {
            return res.status(401).json({ error: "Invalid credentials" });
        } 
        const isMatch = await bcrypt.compare(password, data.secPass);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

router.post('/api/google-login', async (req, res) => {
    const { code } = req.body;
  
    try {
      // Exchange the authorization code for an access token
      const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'http://localhost:5173',
        grant_type: 'authorization_code'
      });
  
      const { access_token, id_token } = tokenResponse.data;
  
      // Use access_token to get user information if needed
      const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
  
      const userInfo = userInfoResponse.data;
      console.log("User Info:", userInfo);

      // Handle user login or registration here
      const userDetail = await User.findOne({ googleId: userInfo.sub });
      if (!userDetail) {
        let newUser = new User({
          googleId: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
        });
        await newUser.save();
        console.log("New user created:", newUser);
      } else {
        console.log("Existing user found:", userDetail);
        }
        res.status(200).json({
        message: 'Login successful',
        user: userInfo,
        token: id_token // or your own session token
      });
    } catch (error) {
      console.error('Error exchanging authorization code', error);
      res.status(500).json({
        message: 'Error during Google login',
        error: error.message
      });
    }   
})

router.get('/test', (req, res) => {
    res.send('Hello World!');
});

module.exports = router