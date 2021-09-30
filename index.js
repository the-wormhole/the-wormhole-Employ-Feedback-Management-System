const express = require('express');
const port = 8000;
const db = require('./config/mongoose');        // MongoDb config set

const app = express();
const router = require('./routes/index');      

app.use(express.urlencoded());          //For parsing form data into the body

app.set('view engine','ejs');
app.set('views','./views');         // Setting up ejs template engine

app.use('/',router);            // Calls the index.js of routes to set up routing system
app.listen(port, (err)=>{
    if(err){
        console.log('Error in initiating server!!');
    }
    console.log('Server Up and running at port:',port);
});