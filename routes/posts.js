const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Post = require('../models/post');

// Get Posts
router.get('/posts', (req, res, next) => {
    res.send('Get Post by Id');
})

// Get Post by Id
router.get('/posts/:id', (req, res, next) => {
    res.send('Get Post by Id');
})

// Get Post by User
router.get('/posts/:username', (req, res, next) => {
    res.send('Get Post by User');
})

// Create Post
router.post('/posts', (req, res, next) => {
    res.send(req.body);
    //res.send('Create Post');
})

// Update Post
router.put('/posts/:id', (req, res, next) => {
    res.send(req.body);
    //res.send('Update Post');
})

// Delete Post
router.delete('/posts/:id', (req, res, next) => {
    res.send('Delete Post');
})

module.exports = router;