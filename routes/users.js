const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');


// Create User
router.post('/register', (req, res, next) => {
    let newUser = new User({
        profile: {
            firstName: req.body.profile.firstName,
            lastName: req.body.profile.lastName,
            image: req.body.profile.image,
            about: req.body.profile.about
        },
        roleId: req.body.roleId,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    
    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg: 'Failed to register user'});
        }
        else {
            res.json({success: true, msg: 'User registered'});
            //res.json({success: true, msg: newUser});
        }
    })
});

// Authenticate User
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) {
            throw err;
        }

        if(!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        // Compare user input password (password), with hashed password (user.password)
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) {
                throw err;
            }
            
            if(isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        profile: user.profile,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            else {
                return res.json({success: false, msg: 'Wrong password'})
            }
        });
    });
});

// Profile "passport.authenticate('jwt', {session: false})"" is used to protect route
// Get User Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

// Update User Profile
router.put('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    req.user.roleId = req.body.roleId; // Remove this
    req.user.email = req.body.email; // Remove this
    req.user.username = req.body.username; // Remove this?
    req.user.password = req.body.password; // Remove this
    req.user.profile.firstName = req.body.profile.firstName;
    req.user.profile.lastName = req.body.profile.lastName;
    req.user.profile.image = req.body.profile.image;
    req.user.profile.about = req.body.profile.about;

    req.user.save(function(err) {
        if(err) {
            res.json({success: false, msg: 'Failed to update User Profile'});
        }
        else {
            res.json({success: true, msg: 'Successfully updated User Profile'});
        }
    })
});

module.exports = router;