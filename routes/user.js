const express = require('express')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { JWT_EXPIRE_TIME, JWT_SECRET } = require('../config/server');

const router = express.Router();

//login route
router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log("user problem");
            return res.status(400).json({error: "Invalid Credentials"});
        }
        
        if(user.password !== password){
            console.log('password problem');
            return res.status(400).json({error: "Invalid Credentials"});
        }
        res.clearCookie('jwt');
        const token = jwt.sign({ id: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRE_TIME });
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true
        });
        return res.json({message: 'Login Successfull'});
    }
    catch(error){
        console.log(error);
        return res.json({error: 'Login Unsuccessful'});
    }
});

// AuthMe route
router.get('/authme', async (req, res) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ email: decoded.id });
        if (!user) {
            return res.status(401).send('Unauthorized');
        }
        return res.json(user);
    } catch (err) {
        return res.status(401).send('Unauthorized');
    }
});

// Logout route
router.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.json({message: 'Logout Successful'});
});


router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name: name, email: email, password: password });
        return res.json(user);
    }
    catch (error) {
        console.log(error);
        return res.json(error);
    }
});

module.exports = router;