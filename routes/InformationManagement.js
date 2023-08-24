// for disaster information mangement
const express=require('express');
const multer = require('multer');
const path = require('path');
// define the storage for the files
const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Specify the destination directory
},
filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension); // Specify the file name
},
});
const upload = multer({ storage });
const router=express.Router();
const authController=require('../controllers/InformationManagement');
router.post('/AddInformation',upload.array('files') , authController.AddInformation);
router.get('/GetInformation', authController.GetInformation);
router.get('/GetInformationHome', authController.GetInformationHome);
router.get('/GetInformationDetail', authController.GetInformationDetail);
router.get('/GetDisaster', authController.GetDisaster);
router.get('/DeleteInformation', authController.DeleteInformation);
router.post('/EditInformation',upload.array('files') , authController.EditInformation);
router.get('/FindInformation', authController.FindInformation);
router.post('/DisasterReport', authController.DisasterReport);
module.exports=router;

// to upload a file
// router.post('/AddInformation', upload.single('file'), authController.AddInformation);