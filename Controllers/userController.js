const User=require('../models/User');
const bcrypt=require('bcrypt');

exports.createUser=(userData)=>{
  return bcrypt.hash(userData.password,10)
    .then(hash => {
        const user=new User({
            email:userData.email,
            username:userData.username,
            password:hash,
            fullname:userData.fullname,
            pdp:userData.pdp,
            role:userData.role
        })
        return user;
    })
}


exports.getUser=async (userId)=>{
    const user=await User.findOne({_id:userId});
    return user;
}

exports.getUserById=async (req,res)=>{
    try {
        const user=await User.findOne({_id:req.auth.user_id}).populate('role');
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}

