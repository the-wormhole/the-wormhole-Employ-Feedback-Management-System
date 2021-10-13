const passport = require('passport');
const Admin  = require('../models/admin');
const Employ = require('../models/employ');
const LocalStrategy = require('passport-local').Strategy;

passport.use('admin-local',new LocalStrategy({      // Local Strategy for admin
    usernameField:'Email',            
    passReqToCallback: true            

},function(req, Email,password,done){   

    Admin.findOne({Email:Email},function(err,admin){
        if(err){
            console.log("Error in finding admin --> Passport");
            req.flash('error',err);
            return done(err);
        }
        if(!admin || admin.password != password){
            //req.flash('error','Invalid Email Id/ Password')
            //console.log("Incorrect Username / Password");
            return done(null,false,{message:"Incorrect Username / Password"});
        }

        return done(null,admin);
    });

}))

passport.use('employ-local',new LocalStrategy({     //Local Strategy for Employ
    usernameField:'Email',             
    passReqToCallback: true            

},function(req, Email,password,done){   

    Employ.findOne({Email:Email},function(err,employ){
        if(err){
            console.log("Error in finding employ --> Passport");
            req.flash('error',err);
            return done(err);
        }
        if(!employ || employ.password != password){
            //req.flash('error','Invalid Email Id/ Password')
            //console.log("Incorrect Username / Password");
            return done(null,false,{message:"Incorrect Username / Password"});
        }

        return done(null,employ);
    });

}))

function SessionConstructor(userId, userGroup, details) {       //Function to specify the Model to query the "id" with in MongoDB
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
}

passport.serializeUser(function(user,done){

        //<---Here "user" could be a Admin or a Employ-->
        let userGroup = "employ";
        let userPrototype =  Object.getPrototypeOf(user);
    
        if (userPrototype === Admin.prototype) {            //Using the prototype value, differentiating the type of user
          userGroup = "admin";
        }else if(userPrototype === Employ.prototype) {
          userGroup = "employ";
        }
    
        let sessionConstructor = new SessionConstructor(user.id, userGroup, '');
        return done(null,sessionConstructor);

});

passport.deserializeUser(function(sessionConstructor,done){

    if (sessionConstructor.userGroup == 'admin') {                  // Deserializing based on the type of user 
        Admin.findOne({_id: sessionConstructor.userId},function (err, user){
            done(err, user);
        });
    }else if(sessionConstructor.userGroup == 'employ'){
        Employ.findOne({_id: sessionConstructor.userId}, function (err, user) {
            done(err, user);
        });
    }

})

passport.checkAuthentication = function(req,res,next){
                        
    if(req.isAuthenticated()){          //<<<< --------------- This middleware is like a license check, if you have the license, you can go ahead to access the services
        //console.log('here');
        return next();
    }
    console.log('not authenticated!');
    return res.redirect('/employ/sign-up');
}

passport.setAuthenticatedUser = function(req,res,next){         //<<<<<---------- This is to set customer for views to access customer using locals

    if(req.isAuthenticated()){

        res.locals.user = req.user;                 //<<<<<<---- passport after authentication places the user in the req(req.user contains the authenticated user)
        console.log("Setting up user",req.user)
    }
    next();
    //return res.redirect('/customer/sign-in');
}

module.exports = passport;
