const e = require("express");
const {ngo}=require("../models/NGOs");
async function register(req,res,next){
  
    ngo.findOne({email:req.body.email},function(error,docs){
    if(docs)
    {
       
      res.send('Already have an account')
    }
    else
    {
      if(req.body.password==req.body.confirm_password)
      {
         const first_ngo=new ngo({name:req.body.name,email:req.body.email,password:req.body.password,confirm_password:req.body.confirm_password,phone_no:req.body.phone_no});
         first_ngo.save();
         res.send('Account registered successfully')
      }
      else
      {
        res.send('password doesnt matches ,plz try again')
      }
      

    }
});
}
 
module.exports={register};
 