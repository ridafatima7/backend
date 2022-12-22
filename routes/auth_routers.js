const express=require('express');
const router=express.Router();
const authController=require('../controllers/auth');
router.get('/get_data',authController.get_data);
router.get('/get_marks',authController.get_marks);
router.post('/validate',authController.validate);
module.exports=router;