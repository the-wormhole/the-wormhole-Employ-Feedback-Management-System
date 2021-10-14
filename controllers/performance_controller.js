const Performance = require('../models/performance')
const Employ = require('../models/employ');
const Admin = require('../models/admin')

module.exports.empPerformance = async function(req,res){        // Searching for the performance and employ to display in performance view

    try{
        let userPrototype =  Object.getPrototypeOf(res.locals.user);
        if(userPrototype == Admin.prototype || res.locals.user.isAdmin ){       // Only an admin can add a review

            let EId = req.params.id;
            let perform = await Performance.findOne({EmpId:EId})
            let employ = await Employ.findById(EId);
            return res.render('employPerform-view',{
                perform:perform,
                employId: EId,                 // To identify the employ for whom the review is being written, when the form gets submitted
                employ: employ
            });

        }else{
                console.log('The user is not an Admin!!')
                return res.redirect('back');
        }
    }catch(err){
        console.log(err,'Error in displaying performance edit page!');
        return;
    }

}

module.exports.create = async function(req,res){        // Create a new employ review

    try{
        let userPrototype =  Object.getPrototypeOf(res.locals.user);
        if(userPrototype == Admin.prototype || res.locals.user.isAdmin ){       // Only an admin can add a review
            let EId = req.params.id;
            let performance = await Performance.create({
                EmpId:EId,
                rating: req.body.rating,
                review: req.body.review
            });
            console.log('Review added!!',performance);
            return res.redirect('/admin/home');
        }else{
            console.log('The user is not an Admin!!')
            return res.redirect('back');
        }
    }catch(err){
        console.log(err,'Error in creating review!!');
        return;
    }
}

module.exports.update = async function(req,res){        // Update an existing employs review

    try{
        let userPrototype =  Object.getPrototypeOf(res.locals.user);
        if(userPrototype == Admin.prototype || res.locals.user.isAdmin ){       // Only an admin can add a review

            let EId = req.params.id;
            let performance = await Performance.findOne({EmpId:EId});
            performance.rating = req.body.rating;
            performance.review = req.body.review;
            performance.save();
            console.log('Updated the review!!', performance);
            return res.redirect('/admin/home');

        }else{
            console.log('The user is not an Admin!!')
            return res.redirect('back');
        }
    }catch(err){
        console.log(err,'Error in updating the performance review!!');
        return;
    }
}

module.exports.assignView = async function(req,res){

    try{
        let userPrototype =  Object.getPrototypeOf(res.locals.user);
        if(userPrototype == Admin.prototype || res.locals.user.isAdmin ){       // Only an admin can add a review

            let PId = req.params.id;
            let employs = await Employ.find({participations:{$ne:PId}});        //Finding the employs that are not assigned to the review already
            let review = await Performance.findById(PId);

            return res.render('assign-view',{
                employs:employs,
                rev:review
            })
        }else{
            console.log('The user is not an Admin!!')
            return res.redirect('back');
        }
    }catch(err){
        console.log(err,'Error in opening Feedback Assign page!');
        return;
    }
}

module.exports.assign = async function(req,res){
    
    try{

        let userPrototype =  Object.getPrototypeOf(res.locals.user);
        if(userPrototype == Admin.prototype || res.locals.user.isAdmin ){       // Only an admin can add a review

            let RId = req.params.Revid;
            let EId = req.params.Empid;                                         

            let employ = await Employ.findById(EId)                         //Searching the Employ by his id and pushing the review id into the participations array
            await employ.participations.push(RId);
            employ.save();
            console.log('Review assigned to:',employ.Name);
            return res.redirect('back');

        }else{
            console.log('The user is not an Admin!!')
            return res.redirect('back');
        }
    }catch(err){
        console.log(err,'Error in Assigning a revew!!');
        return;
    }
}