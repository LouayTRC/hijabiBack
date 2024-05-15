const express=require('express');
const router=express.Router();
const commentCtrl=require('../Controllers/commentController')
const authorize=require('../middleware/authorize')

router.post('/new/:id',authorize(["Client"]),commentCtrl.addComment)
router.post('/reply/:id',authorize(["Vendeur"]),commentCtrl.replyComment)
router.delete('/:id',authorize(["Client"]),commentCtrl.deleteComment)

module.exports=router