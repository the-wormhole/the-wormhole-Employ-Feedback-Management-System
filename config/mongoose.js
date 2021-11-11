const mongoose = require('mongoose');

//Setting up MongoDB 

mongoose.connect(process.env.MONGO_ATLAS,{useUnifiedTopology: true}); 

const db = mongoose.connection;

db.on("error",console.error.bind(console,"Error in connecting to MongoDB!"));

db.once('open',function(){
    console.log("Successfully connected to the MongoDB Database!!!");
})

module.exports = db;
