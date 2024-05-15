const express=require('express');
const router=express.Router();
const categoryCtrl=require('../controllers/categoryController');
const authorize=require('../middleware/authorize')
const authenticate=require('../middleware/authenticate')

router.post('/',authenticate,authorize(["Vendeur"]),categoryCtrl.createCategory);
router.delete('/:id',authenticate,authorize(["Vendeur"]),categoryCtrl.deleteCategory);
router.get('/',categoryCtrl.getCategories);

module.exports=router;