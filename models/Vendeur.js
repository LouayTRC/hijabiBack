const mongoose=require('mongoose');
const User=require('./User');

const vendeurSchema=mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
},{versionKey:false,timestamps: true});

module.exports=mongoose.model('Vendeur',vendeurSchema);