const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    emp_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employ'                            // Stores the Employ id of the Admin
    },
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
    }
},{timestamps: true});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;