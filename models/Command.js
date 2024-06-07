const mongoose = require('mongoose');

const commandSchema = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    total:{type:Number},
    Products: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            price:{type:Number,required:true},
            qte:{type:Number,required:true}
        }
    ],
    date_cmmd: { type: Date, required: true },
    status: { type: Number, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Command', commandSchema);

