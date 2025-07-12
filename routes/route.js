const express = require('express');
require('dotenv').config();
const router = express.Router();

const sitename = 'Mwiza Sichinga - Software Developer';


router.get('/', (req, res)=>{
    res.render('index',
         {sitename}
        );
});

router.get('/blogs', (req, res)=>{
    res.render('blogs');
});

router.get('/contact', (req, res)=>{
    res.render('contact');
});

router.get('/archives', (req, res)=>{
    res.render('archives');
});

router.get('/search', (req, res)=>{
    res.render('search');
});


module.exports = router;
