const express=require('express');
const roleCtrl=require('../Controllers/roleController');
const router=express.Router();


router.post('/',roleCtrl.createRole)
router.delete('/:id',roleCtrl.deleteRole)
router.get('/',roleCtrl.getRoles)

module.exports=router
