const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    dateOfJoin:{
        type:Date,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    workExperience:{
        type:Number,
        required:true
    },
    previousSalary:{
        type:Number,
        required:true
    },
    currentSalary:{
        type:Number,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    currentAddress:{
        type:String,
        required:true
    },
    currentArea:{
        type:String,
        required:true
    },
    currentCity:{
        type:String,
        required:true
    },
    currentState:{
        type:String,
        required:true
    },
    currentPincode:{
        type:Number,
        required:true
    },
    previousOrganisationName:{
        type:String,
        required:true
    },
    profilePicture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Files',
        required:true
      },
      documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Files',
      }],
      password:{
        type:String,
        required:true
      },
      role:{
        type:Number,
        required:true
      }
},{timestamps:true});

const Employees = mongoose.model('Employee',employeeSchema);

module.exports = {Employees};