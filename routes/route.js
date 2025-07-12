const express = require('express');
require('dotenv').config();
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index')
});

router.get('/blogs', (req, res)=>{
    res.render('blogs');
});

router.get('/contact', (req, res)=>{
    res.render('connect');
});

router.get('/archives', (req, res)=>{
    res.render('archives');
});

router.get('/search', (req, res)=>{
    res.render('search');
});


module.exports = router;
