const Employ = require('../models/employ');
const Admin = require('../models/admin');
const Performance = require('../models/performance');
const FeedBack = require('../models/feedback');
// Creating New Employ 

module.exports.home = async function(req,res){

    //console.log(req.user.id);
    try{
        let userPrototype =  Object.getPrototypeOf(res.locals.user);      
        //console.log('here',res.locals.user);
        if(userPrototype == Employ.prototype || res.locals.user.isAdmin ){      // To access Employ page we can only go through direct authentication

            let EId = req.user.id;
            let performance = await Performance.findOne({EmpId:EId})    //populating for displaying the review that the user received, along with the feedbacks
            .populate({
                path:'feedbacks',
                options:{ sort: '-createdAt'},
                populate:{
                    path:'byEmploy'
                }
            }).sort('-createdAt');                      //<<<<<<-------- For sorting the posts in reverse chronological order

            //console.log(performance);

            let employ = await Employ.findById(EId)             // populating for displaying the reviews assigned to this employ for adding a feedback
            .populate({                                         //for populating the reviews followed by feedbacks
                path:'participations',          
                options:{ sort: '-createdAt'},
                populate:{
                    path:'feedbacks',
                    options:{sort: '-createdAt'},
                    populate:{
                        path:'byEmploy'
                    }
                }
            })                                 
            .populate({                     
                path:'participations',                  //for populating the employ inside the reviews
                populate:{
                    path:'EmpId'
                }
            }).sort('-createdAt');

            let admins = await Admin.find();
            
            return res.render('employ_home',{
                perform:performance,
                emp:employ,
                admins:admins
            });
        }else{

            console.log('Access with Employ login!');       //Destroying the previously created admin session to login as an employ
            req.logout();
            return res.redirect('/employ/sign-in');
        }
    }catch(err){
        console.log(err,'Error in displaying Employee home page!!');
        return;
    }
    
}

module.exports.signUp = async function(req,res){
    
    return res.render('signUp');
    
    //return res.send('<h1> Hello</h1>');
}

module.exports.create = async function(req,res){

    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back');
   }
   try{
        let employ = await Employ.findOne({Email:req.body.Email});

        if(!employ){
            
            Employ.create({
                Name:req.body.Name,
                Email:req.body.Email,
                password:req.body.password
            },function(err,newEmploy){
                if(err){console.log(err,"Error inside create function on Employ!!");}
                
                console.log("*******",newEmploy);
                if(res.locals.user){
                    let userPrototype =  Object.getPrototypeOf(res.locals.user);
                    if(userPrototype == Admin.prototype || res.locals.user.isAdmin){

                        return res.redirect('/admin/create-admin');                     // If employ is created by an Admin, redirect it to the all employs page
                    }
                }else{
                    return res.redirect('/employ/sign-in');
                }
            })
        }else{
            console.log('Employ already exists in database!!')
            return res.redirect('back');
        }
    }catch(err){
        console.log(err,"Error in creating new Employ!!");
        return;
    }
}

module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/');
    }else{
        return res.render('employ-signIn');
    }
}

module.exports.createSession = function(req,res){

    return res.redirect('/');
}

module.exports.destroySession = function(req,res){

    req.logout();                                   //<<<<<<<<----------- This function is supplied by passport into the req
    return res.redirect('/');
}