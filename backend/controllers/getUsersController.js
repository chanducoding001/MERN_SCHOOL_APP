
// const Users = require("../models/User");

// const getAllUsers = async (req,res)=>{
//     try{
//         const users = await Users.find().select('-password');

//     if(users.length>0)return res.status(200).json({message:'users data',data:users});
//     return res.status(400).json({message:'users not found'})
//     }catch(err){
//         console.log(err);
//         return res.status(500).json({message:'intternal server error'})
//     }
// }

// module.exports = {getAllUsers};

const {Users} = require("../models/User");

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({}).select("-password");

        if (users.length > 0) {
            return res.status(200).json({ message: 'Users data', data: users });
        } else {
            return res.status(404).json({ message: 'No users found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllUsers };
