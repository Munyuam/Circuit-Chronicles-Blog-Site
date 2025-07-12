const express = require('express');
require('dotenv').config();
const route = require('./routes/route')
const expressLayouts = require('express-ejs-layouts')
const path = require('path');
const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout/main');
app.use(expressLayouts);

app.use(express.static(path.join(__dirname,'public')));

app.use('/', route);

app.use((req,res)=>{
    res.status(404).render('404');
})

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).render('500', {err: err.message});
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})
