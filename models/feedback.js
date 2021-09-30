const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    performance:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Performance'                       // Stores the id of the performance on which the review was made
    },
    byEmploy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employ'                            // Store the Employ that made the feedaback
    }
},{timestamps: true});

const Feedback = mongoose.model('Feedback',feedbackSchema);

module.exports = Feedback;