const express=require('express')
const router=express.Router()
const userCtrl=require('../Controllers/userController')

router.use('/',userCtrl.getUserById)

module.exports=router;