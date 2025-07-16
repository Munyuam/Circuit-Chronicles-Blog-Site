const mongoose = require('mongoose');

const dbconnect = async ()=> {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connect to database successfully")
    }
    catch(error){
        console.log(error);
    }
}

module.exports = dbconnect;