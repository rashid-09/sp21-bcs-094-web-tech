const mongoose = require('mongoose');



const connectToMongo = () =>{
    mongoose.connect(process.env.DB_KEY,()=>{
        console.log("Connected to MongoDB");
    })
}
module.exports = connectToMongo;