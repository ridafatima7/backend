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
const ReliefController=require('../controllers/DisasterReliefManagement');
router.post('/AddInformation', upload.array('files') , ReliefController.AddInformation);
router.get('/GetInformation', ReliefController.GetInformation);
router.get('/GetInformationHome', ReliefController.GetInformationHome);
router.get('/GetInformationDetail', ReliefController.GetInformationDetail);
router.get('/Reliefactivity', ReliefController.GetReliefActivity);
router.get('/DeleteInformation', ReliefController.DeleteInformation);
router.post('/EditInformation',upload.array('files') , ReliefController.EditInformation);
router.get('/FindInformation', ReliefController.FindInformation);
module.exports=router;