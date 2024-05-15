const mongoose=require('mongoose');

const commentSchema=mongoose.Schema({
    description:{type:String,required:true},
    Client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    replys:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{versionKey:false,timestamps: true});

module.exports=mongoose.model('Comment',commentSchema);