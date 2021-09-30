const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({

    EmpId:{                                     //Stores the Employ on which the review was made
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employ'
    },
    rating:{                                    // Value ranging from 0 to 10
        type: Number,
    },
    review:{
        type:String,
        required:true
    },      
    feedbacks:[{                                // Stores all the feedback ids on a particular performance review
        type:mongoose.Schema.Types.ObjectId,
        ref:'Feedback'
    }]
},{timestamps: true});

const Performance = mongoose.model('Performance',performanceSchema);

module.exports = Performance;