const e = require("express");
var mongoose=require('mongoose');
const {Donation}=require("../models/Donations");
async function Donations(req,res,next)
{
  
  // user.findOne({email:req.body.email},function(error,docs){
  // if(docs)
  // {
     
  //   res.send('Already have an account')
  // }
  // else
  // {
    // if(req.body.password==req.body.confirm_password)
    // {
       const first_user=new Donation({name:req.body.name,email:req.body.email,Amount:req.body.amount,NGO:req.body.ngo,phone_no:req.body.phone_no});
       first_user.save();
       res.send('Donated Successfully')
    // }
    // else{
    //   res.send('password doesnt matches ,plz try again')
    // }

   //}
//});
}
async function getDonation(req, res, next) {
   const filter = {};
   // const Role = req.session.user.role;
   // if(Role=="admin" )
   // {
    const AllInformation = await Donation.find(filter);
    res.send(AllInformation);
   // }
   // else
   // {
   //    res.send({ "indicator": "error" });
   // }
}
async function deleteDonation(req, res, next) {
   const role = req.session.user.role;
   if (role == "NGO") {
       Donation.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.query.temp_id) }, (err) => {
       if (err) {
         res.send({ "indicator": "error", "messege": err });
       }
       else {
         res.send({ "indicator": "success", "messege": "Donation Record deleted successfully" });
       }
     })
   }
   else {
     res.status(403).send("Forbidden");
   }
}

module.exports={Donations,deleteDonation,getDonation};