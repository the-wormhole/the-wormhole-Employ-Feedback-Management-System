const FeedBack = require('../models/feedback');
const Performance = require('../models/performance');


module.exports.add = async function(req,res){
    try{
        let EId = req.user.id;
        let PId = req.params.id;
        let feedback = await FeedBack.create({
            content: req.body.content,
            performance:PId,
            byEmploy:EId
        });

        let perform = await Performance.findById(PId);
        perform.feedbacks.push(feedback);
        perform.save();

        return res.redirect('back');
    }catch(err){
        console.log(err,'Error in adding a feedback!');
        return res.redirect('back')
    }
}

module.exports.delete = async function(req,res){

    try{
        let FId = req.params.id;
        let feedback = await FeedBack.findById(FId);
        if(feedback.byEmploy == req.user.id){

            let PId = feedback.performance;
            feedback.remove();

            await Performance.findByIdAndUpdate(PId , {$pull: {feedbacks:FId}}, {useFindAndModify: false});

            console.log('Deleted the Feedback!');
            return res.redirect('back');
        }else{
            console.log('Un-Authorised!!!');
            return res.redirect('back');
        }

    }catch(err){
        console.log(err,'Error in Deleteing the feedback!');
        return res.redirect('back');
    }
}