const Product = require('../models/Product')
const Comment = require('../Models/Comment');
const Vendeur = require('../models/Vendeur');

exports.addComment = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const comment = new Comment({
            ...req.body
        });
        await comment.save();
        product.comments.push(comment);
        await product.save();
        return res.status(201).json(comment);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}

exports.deleteComment = (req, res) => {
    Comment.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'deleted successfully' }))
        .catch((error) => res.status(400).json({ error }))
}

exports.replyComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id })
        const vendeur= await Vendeur.findOne({user:req.auth.user_id})
        if (vendeur._id=comment.vendeur) {
            const reply = new Comment({
                ...req.body
            });
            await reply.save()
            comment.replys.push(reply)
            await comment.save()
            res.status(201).json(comment)
        } else {
            res.status(401).json({message:"you cannot reply to a comment on another vendeur product"})
        }
        
    }
    catch(error){
        res.status(400).json({ error })
    }


}