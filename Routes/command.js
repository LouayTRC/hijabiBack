const express=require('express')
const router=express.Router()
const cmmdCtrl=require('../Controllers/commandController')
const authorize=require('../middleware/authorize')

router.post('/',authorize(["Client"]),cmmdCtrl.createCommand)
router.get('/mine',authorize(["Vendeur"]),cmmdCtrl.myCommands)
router.get('/:id?',cmmdCtrl.getCommand)

module.exports=router