const express = require('express');
const port = process.env.PORT || 8000;
const env = require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');        // MongoDb config set

const session = require('express-session');     ///<<<---- encrypts the session cookie
const passport = require('passport');
const passportLocalStrategy = require('./config/passport-local-strategy');
//const MongoStore = require('connect-mongo')(session); 
const MongoStore = require('connect-mongo')(session);
const app = express();
const router = require('./routes/index');      

app.use(express.urlencoded());          //For parsing form data into the body
app.use(cookieParser());

app.set('view engine','ejs');
app.set('views','./views');         // Setting up ejs template engine

app.use(express.static('assets'));

app.use(session({
    name:'Emp_id',
    secret: process.env.PASSPORT_SECRET,                     ////<<<<<<------------------ Change the session cookie before Deployment ~~~~ IMPORTANT
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store:new MongoStore({

        mongooseConnection: db,
        autoRemove: 'disabled'
    },function(err){
        console.log(err+"Error in setting up mongostore!!!"|| 'connect-mongodb server setup ok')
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',router);            // Calls the index.js of routes to set up routing system
app.listen(port, (err)=>{
    if(err){
        console.log('Error in initiating server!!');
    }
    console.log('Server Up and running at port:',port);
});