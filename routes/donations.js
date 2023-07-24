const express=require('express');
const router=express.Router();
const authController=require('../controllers/donation');
router.post('/donations',authController.Donations);
module.exports=router;