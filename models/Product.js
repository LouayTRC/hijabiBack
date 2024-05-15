const mongoose=require('mongoose');
const Vendeur = require('./Vendeur');

const productSchema=mongoose.Schema({
    name:{type:String,required:true},
    qte:{type:Number,required:true},
    description:{type:String,required:true},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    pic:{type:String,required:true},
    price:{type:Number,required:true},
    status:{type:Number,required:true},
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    Vendeur:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendeur'
    }
}, { versionKey: false});


module.exports=mongoose.model('Product',productSchema);