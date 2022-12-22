const e = require("express");

const {user}=require("../models/user");
async function get_data(req,res,next)
{
  res.send(req.query.name);
}
async function get_marks(req,res,next)
{
  res.send(req.query.marks);
}
async function validate(req,res,next)
{
  // ({$and:[{email:req.body.email},{password:req.body.password}]},function(error,docs)
  user.findOne({email:req.body.email,password:req.body.password},function(error,docs)
  {
    if(error){
    res.send(error)
  
   }
    else
    {
      res.send(docs);
    }
  });
  
  // // const email=user.find({email});
  // // const password=user.find({password});
  // const email='rida.bsse3962@gmail.com';
  // const password='5675';
  // if(email==req.body.email && password==req.body.password)
  // {
  //   res.send('logged in');
  // }
  // else{
  //   res.send('failed');
  // }
  
}

module.exports={get_data,get_marks,validate};