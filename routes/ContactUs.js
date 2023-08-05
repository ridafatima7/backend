const express=require('express');
const router=express.Router();
const ContactController=require('../controllers/ContactUs');
router.post('/Contact_Us',ContactController.Contactus);
router.get('/GetMessages',ContactController.GetMessages);
router.get('/FindMessages',ContactController.FindMessages);
router.get('/deleteMessages',ContactController.DeleteMessages);
module.exports=router;