const mongoose = require('mongoose');

const employSchema = new mongoose.Schema({

    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false                           // Identifies whether an Employ is an Admin or not, set to 'false' by default
    },
    participations:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Performance'                       // Stores all the Performances the Employ was assigned to give a feedback on
    }]
},{timestamps: true});

const Employ = mongoose.model('Employ',employSchema);

module.exports = Employ;