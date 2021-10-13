const Employ = require('../models/employ');
const Admin = require('../models/admin');
// Creating New Employ 
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