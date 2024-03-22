const {Students} = require('../models/Students');

const addStudent = async (req,res)=>{
    if(!req.body) return res.status(400).json({message:'student data is required!'})
    try{
        const {rollNumber} = req.body;
        const duplicate = await Students.findOne({rollNumber});
        if(duplicate) return res.status(402).json({message:`student with roll number ${rollNumber} already exists!`});
        const newStudent = await Students.create(req.body);
        if(!newStudent) return res.status(402).json({message:'could not add student!'});
        return res.status(200).json({message:'data added successfully!',newStudent});
    }catch(err){
        console.log(err);
    }
}

const getStudents = async (req,res)=>{
    try{
        
        const allStudents = await Students.find({});
        if(!allStudents.length) return res.status(402).json({message:'students data is not found!'});
        return res.status(200).json({message:'all students',data:allStudents})
    }catch(err){
        console.log(err);
    }
}

module.exports = {addStudent,getStudents}