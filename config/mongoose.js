const mongoose = require('mongoose');

//Setting up MongoDB 

mongoose.connect('mongodb://localhost/FeedBack-System',{useUnifiedTopology: true}); 

const db = mongoose.connection;

db.on("error",console.error.bind(console,"Error in connecting to MongoDB!"));

db.once('open',function(){
    console.log("Successfully connected to the MongoDB Database!!!");
})

module.exports = db;