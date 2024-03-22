var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var parentSchema = new Schema({
        email: {
            type:String,
            required:true,
            unique:true
        },
        profilePicture:{
            type:Schema.Types.ObjectId,
            ref:'files',
            required:true
        },
        children: [{type:Schema.Types.ObjectId,ref:'Students'}],
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:Number,
            required:true,
            default:3
        },
        relation:{
            type:String,
            required:true
        },
        mobile:{
            type:Number,
            required:true
        },
        currentAddress:{
            type:String,
            required:true
        }
},{timestamps:true});

var Parents = mongoose.model('Parent',parentSchema);

module.exports = {Parents};