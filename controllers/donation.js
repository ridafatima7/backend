const e = require("express");
var mongoose=require('mongoose');
const {Donation}=require("../models/Donations");
const moment = require('moment');

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
       const first_user=new Donation({name:req.body.name,email:req.body.email,Amount:req.body.amount,NGO:req.body.ngo,phone_no:req.body.phone_no,Account_Holder:req.body.accountholder,Account_Number:req.body.accountnumber,Expiry_Date:req.body.expirydate,Date:req.body.date,Hide_Info:req.body.hideinfo,added_by:req.session.user._id});
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
  //  const Role = req.session.user.role;
  //  const roleId=req.session.user._id;
  //  if(Role=="admin" )
  //  {
    const AllInformation = await Donation.find(filter);
    res.send(AllInformation);
  //  }
  //  else if(Role=="Donor")
  //  {
  //   const AllInformation = await Donation.find({added_by : roleId});
  //   res.send(AllInformation);
  //  }
  //  else
  //  {
  //     res.send({ "indicator": "error" });
  //  }
}
async function deleteDonation(req, res, next) {
   const role = req.session.user.role;
   if (role == "admin") {
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
async function DonationReport(req, res, next) {
  try
  {
   const { ngo, startDate, endDate } = req.body;
  
  
  let start_Date = ''
  let end_Date = '' 
  if(startDate)
  {
    start_Date = moment(req.body.startDate).startOf('day').toDate()
  }
  else
  {
    start_Date = moment("1979-01-01").startOf('day').toDate()
  }
  if(endDate)
  {
    end_Date = moment(req.body.endDate).endOf('day').toDate()
  }
  else
  {
    end_Date = new moment().endOf('day').toDate()
  }
  console.log("Start Date: " + start_Date)
    console.log("End Date: " + end_Date)
   const query = {
    NGO:ngo,
    createdAt: { $gte: start_Date, $lte: end_Date },
    
   };
   const reports = await  Donation.find(query);
  //  res.json(reports);
   res.send(reports);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

}

module.exports={Donations,deleteDonation,getDonation,DonationReport};