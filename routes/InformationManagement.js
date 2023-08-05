// for disaster information mangement
const express=require('express');
const router=express.Router();
const authController=require('../controllers/InformationManagement');
router.post('/AddInformation', authController.AddInformation);
router.get('/GetInformation', authController.GetInformation);
router.get('/GetInformationHome', authController.GetInformationHome);
router.get('/GetDisaster', authController.GetDisaster);
router.get('/DeleteInformation', authController.DeleteInformation);
router.post('/EditInformation', authController.EditInformation);
router.get('/FindInformation', authController.FindInformation);
module.exports=router;

// to upload a file
// router.post('/AddInformation', upload.single('file'), authController.AddInformation);