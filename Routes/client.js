const express=require('express')
const router=express.Router()
const clientCtrl=require('../Controllers/clientController')

router.get('/',clientCtrl.getClients)

module.exports=router