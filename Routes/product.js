const express=require('express');
const ProductCtrl = require('../controllers/productController');
const router=express.Router();
const authorize=require('../middleware/authorize')
const authenticate=require('../middleware/authenticate')

router.post('/',authenticate,authorize(["Vendeur"]),ProductCtrl.createProduct);

router.get('/:_id?',ProductCtrl.getProduct);

router.put('/:_id',authenticate,authorize(["Vendeur"]),ProductCtrl.updateProduct);


router.delete('/:_id',authenticate,authorize(["Vendeur"]),ProductCtrl.deleteProduct);

module.exports=router;