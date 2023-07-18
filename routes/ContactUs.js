const express=require('express');
const router=express.Router();
const ContactController=require('../controllers/ContactUs');
router.post('/Contact_Us',ContactController.Contactus);
module.exports=router;