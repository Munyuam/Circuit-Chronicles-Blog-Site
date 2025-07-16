const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    title : {
        type: String,
        required : true
    }, 
    author:{
        type: String,
        required : true
    },
    content: {
        type: String,
        required : true     
    },
    createdAt:{
        type:Date,
        required: true,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        required: true,
        default:Date.now
    }
})
module.exports = mongoose.model('Blogs', userSchema);  //exporting the model