const express=require('express')
const router=express.Router()
const adminCtrl=require('../Controllers/adminController')
const authorize=require('../middleware/authorize')

router.post('/',authorize(["Admin"]),adminCtrl.addAdmin)

module.exports=router