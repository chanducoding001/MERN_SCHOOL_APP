var {Parents} = require('../models/Parent');
const bcrypt = require('bcrypt');

const addParentController = async (req,res)=>{
    try{
        if(!req.body){
            return res.status(200).json({message:'all fields are required!'})
        }
        const isExist = await Parents.findOne({email:req.body.email});
        if(isExist)return res.status(402).json({message:'Parent/guardian with this email already exists!'});
        const hashed = bcrypt.hashSync(req.body.password,10);
        const createdParent = await Parents.create({...req.body,password:hashed});
        return res.status(200).json({message:'Parent is created',data:createdParent})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal server error',error:err})
    }
}

const getParentController = async (req, res) => {
    try {
        const email = req.params.email;
        if (!email) return res.status(402).json({ message: 'Email is required!' });
        // Find the parent by email, excluding the password field
        const parent = await Parents.findOne({ email }).select('-password -createdAt -updatedAt')
            .populate({
                path: 'children',
                model: 'Student', // Specify the model for populating children
                //select: '-attendance' // Exclude attendance data of children
                populate:{
                    path:'profilePicture',
                    model:'file'
                }
            }).populate({path:'profilePicture',model:'file'});
        if (!parent) return res.status(404).json({ message: 'Parent not found' });
        return res.status(200).json({ message: 'Parent data', data: parent });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err });
    }
}


module.exports = {addParentController,getParentController};
