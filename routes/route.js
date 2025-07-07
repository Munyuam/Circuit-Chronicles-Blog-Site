const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;

app.get('/', (req, res)=>{
    res.send("hello world");
});