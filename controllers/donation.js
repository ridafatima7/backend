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
       const first_user=new Donation({name:req.body.name,email:req.body.email,address:req.body.address,username:req.body.username,phone_no:req.body.phone_no});
       first_user.save();
       res.send('Donated Successfully')
    // }
    // else{
    //   res.send('password doesnt matches ,plz try again')
    // }

   //}
//});
}
module.exports={Donations};