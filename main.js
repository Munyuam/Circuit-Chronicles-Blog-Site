const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.use('', require('./routes/route'))

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})
