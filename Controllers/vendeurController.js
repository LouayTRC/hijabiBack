const User=require('../models/User')
const Vendeur=require('../models/Vendeur')

exports.getAllVendeurs=async (req,res)=>{
    const vendeurs = await Vendeur.find().populate('user')
    res.status(200).json(vendeurs)
}

exports.acceptVendeur=async (req,res)=>{
    const vendeur=await Vendeur.findOne({_id:req.params.id})
    console.log("vendeur",vendeur);

    User.updateOne({ _id: vendeur.user}, { status:1, _id: vendeur.user})
    .then(()=>res.status(200).json({message:'vendeur activated'}))
    .catch((error)=>res.status(400).json({error}))
}

exports.refuseVendeur=async (req,res)=>{
    const vendeur=await Vendeur.findOne({_id:req.params.id})
    console.log("vendeur",vendeur);

    User.updateOne({ _id: vendeur.user}, { status:-1, _id: vendeur.user})
    .then(()=>res.status(200).json({message:'vendeur désactivated'}))
    .catch((error)=>res.status(400).json({error}))
}

exports.deleteVendeur=async (req,res)=>{
    const vendeur= await Vendeur.findOne({_id:req.params.id})
    console.log("vendeur",vendeur);

    User.deleteOne({ _id: vendeur.user})
    .then(()=>{
        Vendeur.deleteOne({_id:vendeur._id})
        .then(()=>res.status(200).json({message:'vendeur deleted'}))
        .catch((error)=>res.status(400).json({error}))
    })
    .catch((error)=>res.status(400).json({error}))
}