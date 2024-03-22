const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        required:true,
    }
},{timeStamps:true});

const Users = mongoose.model('User',userSchema);

module.exports = {Users}