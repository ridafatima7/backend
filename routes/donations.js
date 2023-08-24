const express=require('express');
const router=express.Router();
const authController=require('../controllers/donation');
router.post('/donations',authController.Donations);
router.get('/deleteDonation',authController.deleteDonation);
router.get('/getDonation',authController.getDonation);
router.post('/DonationReport',authController.DonationReport);

module.exports=router;