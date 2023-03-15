const express=require('express');
const router=express.Router();
const authController=require('../controllers/NGOs');
router.post('/get_register',authController.register);
module.exports=router;