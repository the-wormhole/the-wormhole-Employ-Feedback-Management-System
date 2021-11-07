const mongoose = require('mongoose');

//Setting up MongoDB 

mongoose.connect(process.env.MONGO_ATLAS,{useUnifiedTopology: true}); 
//mongodb+srv://NayanAgarwal:<password>@cluster0.tgf4z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb://localhost/FeedBack-System
const db = mongoose.connection;

db.on("error",console.error.bind(console,"Error in connecting to MongoDB!"));

db.once('open',function(){
    console.log("Successfully connected to the MongoDB Database!!!");
})

module.exports = db;