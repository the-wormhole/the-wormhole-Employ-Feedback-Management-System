const e = require('express');
const Admin = require('../models/admin');
const Employ = require('../models/employ');
exports.create = async function(req,res){

    //let newAdmin = Admin.create

    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back');
   }
   try{
        let admin = await Admin.findOne({Email:req.body.Email});

        if(!admin){
            
            let employ = await Employ.findOne({Email:req.body.Email});      //Searching if there is an employ corresponding to this Email id
            if(employ){                           
                let empId = employ.id;    

                Admin.create({                     // If an Employ exists, only then create make that employ an Admin
                    Name:req.body.Name,
                    Email:req.body.Email,
                    password:req.body.password,
                    emp_id: empId
                },function(err,newAdmin){
                    if(err){console.log(err,"Error inside create funtion on Employ!!");}
                    
                    console.log("*******",newAdmin);
                    return res.redirect('/admin/sign-in');
                });
            }else{
                console.log('An Admin should be an Employ!!');
                return res.redirect('back');
            }
        }else{
            console.log('Already an Admin!!');
            return res.redirect('back');
        }
    }catch(err){
        console.log(err,"Error in creating new Admin!!");
        return;
    }
}

module.exports.signIn = function(req,res){

    return res.render('admin-signIn');
}

module.exports.createSession = function(req,res){

    return res.redirect('/admin/home');
}

module.exports.home = async function(req,res){
    
    //
    let userPrototype =  Object.getPrototypeOf(res.locals.user);      
    console.log('here',res.locals.user);
    if(userPrototype == Admin.prototype || res.locals.user.isAdmin ){         //Checking if the person accessing the admin home is actually an admin

        let employs = await Employ.find();
        return res.render('admin_home',{
            employs:employs
        });
    }else{
        console.log('not an Admin!!');
        return res.redirect('back');
    }
}

module.exports.destroySession = function(req,res){

    req.logout();                                   //<<<<<<<<----------- This function is supplied by passport into the req
    return res.redirect('/admin/sign-in');
}

module.exports.allEmploys = async function(req,res){     //Renders page containing all employees list

    //if(req.isAuthenticated()){
    let userPrototype =  Object.getPrototypeOf(res.locals.user);      
    //console.log('here',res.locals.user);
    if(userPrototype == Admin.prototype || res.locals.user.isAdmin ){ 
        let employ = await Employ.find();
        res.render('all_employess',{
            employs:employ
        });
    }else{
        return res.redirect('/admin/sign-in');
    }

    //
}

module.exports.newAdmin = async function(req,res){

    let empId = req.params.id;
    try{

        let emp = await Employ.findById(empId);     // Retreiving the employ from his id and making him an Admin

                             
        emp.save();                                 // Saving the changes made to employ object
        if(!emp.isAdmin){
            emp.isAdmin = true;
            Admin.create({
                Name:emp.Name,
                emp_id:empId,
                Email:emp.Email,
                password:emp.password
            },function(err,newAdmin){
                if(err){console.log(err,"Error inside create funtion on Employ!!");}
                
                console.log("******* Admin created",newAdmin);
                return res.redirect('back');
            });
        }else{
            
            console.log('Already an Admin!!');
            return res.redirect('back');
        }   
                     
    }catch(err){
        console.log('Error in making the Employ an Admin!!');
        return res.redirect('back');
    }

}

module.exports.deleteEmploy = async function(req,res){

    try{
        let userPrototype =  Object.getPrototypeOf(res.locals.user);      
        //console.log('here',res.locals.user);
        if(userPrototype == Admin.prototype || res.locals.user.isAdmin ){ 
            let EmpId = req.params.id;
            let employ = await Employ.findByIdAndDelete(EmpId);
            console.log('Employ deleted!!',employ);
            return res.redirect('back');
        }else{
            return res.redirect('/admin/sign-in');
        }
    }catch(err){
        console.log(err,'Error in deleting employ!!')
    }
}

module.exports.employForm = async function(req,res){

    try{
        let userPrototype =  Object.getPrototypeOf(res.locals.user);      
        //console.log('here',res.locals.user);
        if(userPrototype == Admin.prototype || res.locals.user.isAdmin ){ 

            
            return res.render('new-employ');                     // Redirecting to the all employs list page
        }else{
            return res.redirect('/admin/sign-in');
        }
    }catch(err){
        console.log(err,'Error in adding the employ!!')
    }
}

module.exports.view = async function(req,res){                              //Function to view employ

    try{
        let empId = req.params.id;
        let userPrototype =  Object.getPrototypeOf(res.locals.user);      
        //console.log('here',res.locals.user);
        if(userPrototype == Admin.prototype || res.locals.user.isAdmin ){       // Checking if it is the admin that is viewing the employ information
            
            let employ = await Employ.findById(empId);
            //console.log(employ);
            return res.render('employ-view',{
                employ:employ
            });

        }else{
            return res.redirect('/admin/sign-in');
        }
    }catch(err){

        console.log('Error in viewing Employ!!');
        return;
    }
}

module.exports.employUpdate = async function(req,res){
    
    let empId = req.params.id;
    let userPrototype =  Object.getPrototypeOf(res.locals.user);      
    //console.log('here',res.locals.user);
    try{
        if(userPrototype == Admin.prototype || res.locals.user.isAdmin ){ 
            
            let employ = await Employ.findById(empId);
            employ.Name = req.body.Name;
            employ.Email = req.body.Email;
            employ.save();
            return res.redirect('back');
        }else{
            return res.redirect('/admin/sign-in');
        }
    }catch(err){
        console.log(err,'Error in updating employ information!!');
    }

}