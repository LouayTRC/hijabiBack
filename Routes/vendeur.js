const express=require('express')
const router=express.Router()
const vendeurCtrl=require('../Controllers/vendeurController')

router.get('/enable/:id',vendeurCtrl.acceptVendeur)
router.get('/disable/:id',vendeurCtrl.refuseVendeur)
router.get('/',vendeurCtrl.getAllVendeurs)
router.delete('/:id',vendeurCtrl.deleteVendeur)


module.exports=router