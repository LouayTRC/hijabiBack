const express=require('express');
const roleCtrl=require('../Controllers/roleController');
const router=express.Router();
const authenticate=require('../middleware/authenticate')
const authorize=require('../middleware/authorize')

router.post('/',authenticate,authorize(["Admin"]),roleCtrl.createRole)
router.delete('/:id',authenticate,authorize(["Admin"]),roleCtrl.deleteRole)
router.get('/:id',roleCtrl.getRoleById)
router.get('/',roleCtrl.getRoles)

module.exports=router
