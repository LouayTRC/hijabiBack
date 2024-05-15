const Category = require("../models/Category")

exports.createCategory=(req,res,next)=>{
    const category=new Category({
        name:req.body.name
    });
    category.save()
    .then((category)=>res.status(201).json(category))
    .catch(error=>res.status(400).json({error}));
}

exports.deleteCategory=(req,res,next)=>{
    Category.deleteOne({_id:req.params.id})
    .then(()=>res.status(200).json({message:'deleted successfully'}))
    .catch((error)=>res.status(400).json({error}))
}

exports.getCategories=(req,res,next)=>{
    Category.find()
    .then(categorys=>res.status(200).json(categorys))
    .catch(error=>res.status(400).json({error}))
}

exports.getCategoryById=async (categoryId)=>{
    const category=await Category.findOne({_id:categoryId});
    return category;
}