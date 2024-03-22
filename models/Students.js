var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    profilePicture:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Files',
        // type:String,
        required:true
    },
    rollNumber:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    motherName:{
        type:String,
        required:true
    },
    parentMobile:{
        type:String,
        required:true
    },
    parentEmail:{
        type:String,
        required:true
    },
    currentAddress:{
        type:String,
        required:true
    },
    attendance:[{date:Date,status:{type:String,enum:['present','absent','late']}}]
});

var Students = mongoose.model('Student',studentSchema);

module.exports = {Students};
