const FeedBack = require('../models/feedback');
const Performance = require('../models/performance');


module.exports.add = async function(req,res){                   // function to add a new feedback
    try{
        let EId = req.user.id;
        let PId = req.params.id;
        let feedback = await FeedBack.create({
            content: req.body.content,
            performance:PId,
            byEmploy:EId
        });

        let perform = await Performance.findById(PId);
        perform.feedbacks.push(feedback);                   // pushing the feedback into the feedbacks array inside the peroformance 
        perform.save();

        return res.redirect('back');
    }catch(err){
        console.log(err,'Error in adding a feedback!');
        return res.redirect('back')
    }
}

module.exports.delete = async function(req,res){            // fucntion to delete a feedback

    try{
        let FId = req.params.id;
        let feedback = await FeedBack.findById(FId);
        if(feedback.byEmploy == req.user.id){               //to be deleted by the person who created it

            let PId = feedback.performance;
            feedback.remove();

            await Performance.findByIdAndUpdate(PId , {$pull: {feedbacks:FId}}, {useFindAndModify: false});         //Removing the feedback from the feedbacks array

            console.log('Deleted the Feedback!');
            return res.redirect('back');
        }else{
            console.log('Un-Authorised!!!');
            return res.redirect('back');
        }

    }catch(err){
        console.log(err,'Error in Deleting the feedback!');
        return res.redirect('back');
    }
}