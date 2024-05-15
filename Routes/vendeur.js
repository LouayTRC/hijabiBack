const express=require('express')
const router=express.Router()
const vendeurCtrl=require('../Controllers/vendeurController')

router.put('/accept/:id',vendeurCtrl.acceptVendeur)
router.put('/refuse/:id',vendeurCtrl.refuseVendeur)
router.get('/',vendeurCtrl.getAllVendeurs)
router.delete('/:id',vendeurCtrl.deleteVendeur)


module.exports=router