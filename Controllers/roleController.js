const Role=require('../models/Role')

exports.createRole=(req,res)=>{
    const role=new Role({
        name:req.body.name
    });
    role.save()
    .then((role)=>res.status(201).json(role))
    .catch(error=>res.status(400).json({error}));
}

exports.deleteRole=(req,res)=>{
    Role.deleteOne({_id:req.params.id})
    .then(()=>res.status(200).json({message:'deleted successfully'}))
    .catch((error)=>res.status(400).json({error}))
}

exports.getRoles=(req,res)=>{
    Role.find({ name: { $ne: 'Admin' } })
    .then((roles)=>res.status(200).json(roles))
    .catch((error)=>res.status(400).json({error}))
}

exports.getRoleById=(req,res)=>{
    Role.findOne({_id:req.params.id})
    .then((role)=>res.status(200).json(role))
    .catch((error)=>res.status(400).json({error}))
}