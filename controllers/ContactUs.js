const e = require("express");
var mongoose=require('mongoose');
const {Contact_Us}=require("../models/ContactUs");
async function Contactus(req,res,next){
         const message=new Contact_Us({name:req.body.name,email:req.body.email,subject:req.body.subject,message:req.body.message});
         message.save();
         res.send('Response Received')
}
async function GetMessages(req, res, next) {
    const filter = {};
    const AllInformation = await Contact_Us.find(filter);
    res.send(AllInformation);
}
async function FindMessages(req, res, next) {
    
    const InformationData = await Contact_Us.findOne({ _id: mongoose.Types.ObjectId(req.query.temp_id) });
    res.send(InformationData);
};
async function DeleteMessages(req, res, next) {
    const role = req.session.user.role;
    if (role == "NGO") {
        Contact_Us.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.query.temp_id) }, (err) => {
        if (err) {
          res.send({ "indicator": "error", "messege": err });
        }
        else {
          res.send({ "indicator": "success", "messege": "Message deleted successfully" });
        }
      })
    }
    else {
      res.status(403).send("Forbidden");
    }
}
module.exports={Contactus,FindMessages,GetMessages,DeleteMessages};
 