const express = require('express');
require('dotenv').config();
// const mongoose = require('mongoose');
const route = require('./routes/route')
const path = require('path');
const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));

app.use('/', route);

app.use((req,res)=>{
    res.status(404).render('404');
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})
