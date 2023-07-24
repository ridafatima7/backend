// for Ngos users
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

const express=require('express');
const router=express.Router();
const authController=require('../controllers/auth');
router.get('/get_data',authController.get_data);
router.get('/get_marks',authController.get_marks);
router.post('/validate',authController.validate);
router.post('/register',authController.register);
router.post('/register',authController.register);
router.post('/editprofile', upload.single('file'), authController.EditProfile);
router.post('/registerNGO',authController.registerNGO);
router.post('/logout',authController.logout);
module.exports=router;