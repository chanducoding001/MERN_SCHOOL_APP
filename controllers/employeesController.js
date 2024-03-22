const {Employees} = require('../models/Employees');
const bcrypt = require('bcrypt');

const postEmployee = async (req,res)=>{
    
    // if(!dateOfJoin || !username || !email
    // || !mobile || !designation || !dob || 
    // !workExperience || !previousSalary || 
    // !currentSalary || !qualification ||
    // !currentAddress || !currentArea ||
    // !currentCity || !currentState || !currentPincode
    // || !previousOrganisationName || !profilePicture){
    //     return res.status(402).json({message:'all fields are required!'})
    // };
    try{
        const hashed = bcrypt.hashSync(req.body.password,10);
        const newEmployee = await Employees.create({...req.body,password:hashed});
        if(newEmployee){
            return res.status(200).json({message:'employee is created',data:newEmployee});
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal server error',error:err})
    }

}

const getEmployees = async (req,res)=>{
    try{
        const employees = await Employees.find({});
        return res.status(200).json({message:'employees data',data:employees})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal server error',error:err})
    }
}

const getParticularEmployee = async (req,res)=>{
    try{
        const id = req.params?.id;
        if(!id) return res.status(402).json({message:'employee data not found!'});
        const user = await Employees.findById({_id:id});
        if(!user) return res.status(402).json({message:'employee not found'});
        return res.status(200).json({message:"employee data",data:user});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'internal server error'})
    }
}

const putEmployeeData = async (req,res)=>{
    try{
        const id = req.params?.id;
        if(!id) return res.status(402).json({message:'employee not found'});
        const {_id} = req.body;
        if(id !== _id)return res.status(402).json({message:'wrong employee id'});
        const user = await Employees.findByIdAndUpdate(_id,req.body,{new:true});
        if(!user) return res.status(402).json({message:'unable to edit data as employee is not found!'})
        return res.status(200).json({message:'edit successfull!',data:user})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal server error',error:err})
    }
}
const getEmployeeThroughEmail = async (req,res)=>{
    const email = req.params.email;
    if(!email) return res.status(402).json({message:'Email is required!'});

    const employee = await Employees.find({email});
    if(!employee) return res.status(402).json({message:'Employee not found!'});
    return res.status(200).json({message:'employee found!',data:employee});
}
const deleteEmployee = async (req,res)=>{
    try{
        const id = req.params?.id;
        const deletedUser = await Employees.findByIdAndDelete({_id:id});
        if(!deletedUser) return res.status(402).json({message:'user not found'});
        return res.status(200).json({message:'delete successfull',deletedUser})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'internal server error',error:err})
    }
}
module.exports = {postEmployee,getEmployeeThroughEmail,getEmployees,getParticularEmployee,putEmployeeData,deleteEmployee};