const mongoose=require('mongoose');

const roleSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
},{versionKey:false,timestamps: true});

module.exports=mongoose.model('Role',roleSchema);