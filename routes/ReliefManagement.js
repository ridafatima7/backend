const express=require('express');
const router=express.Router();
const ReliefController=require('../controllers/DisasterReliefManagement');
router.post('/AddInformation' , ReliefController.AddInformation);
router.get('/GetInformation', ReliefController.GetInformation);
router.get('/DeleteInformation', ReliefController.DeleteInformation);
router.post('/EditInformation', ReliefController.EditInformation);
router.get('/FindInformation', ReliefController.FindInformation);
module.exports=router;