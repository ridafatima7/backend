const express=require('express');
const router=express.Router();
const authController=require('../controllers/auth');
router.post('/donations',authController.Donations);
module.exports=router;