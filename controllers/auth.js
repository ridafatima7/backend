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
async function register(req,res,next){
  
    user.findOne({email:req.body.email},function(error,docs){
    if(docs)
    {
       
      res.send('Already have an account')
    }
    else
    {
      if(req.body.password==req.body.confirm_password)
      {
         const first_user=new user({name:req.body.name,username:req.body.username,email:req.body.email,password:req.body.password,confirm_password:req.body.confirm_password,phone_no:req.body.phone_no,address:req.body.address,account_no:req.body.accountno,description:req.body.description,role:req.body.role}); // add role
         first_user.save();
         res.send('Account registered successfully')
      }
      else{
        res.send('password doesnt matches ,plz try again')
      }

    }
});
  // const first_user=new user({name:req.body.name,email:req.body.email,password:req.body.password});
  //  first_user.save(function(error,docs){
  //   if(error)
  //   {
  //     res.send(error)
  //   }
  //   else
  //   {
  //       res.send(docs)
  //   }
  //  });
    
    
    // if(error){
    // res.send(error)
    // }
    // else
    // {
    //   res.send(docs);
    // }
  
  // user.insert({name:req.body.name,email:req.body.email,password:req.body.password},function(error,docs)
  // {
  //   if(error){
  //   res.send(error)
  
  //  }
  //   else
  //   {
  //     res.send(docs);
  //   }
  //  });
  

  }
  async function registerNGO(req,res,next){
  
    user.findOne({email:req.body.email},function(error,docs){
    if(docs)
    {
       
      res.send('Already have an account')
    }
    else
    {
      if(req.body.password==req.body.confirm_password)
      {
         const first_user=new user({name:req.body.name,email:req.body.email,password:req.body.password,confirm_password:req.body.confirm_password,phone_no:req.body.phone_no});
         first_user.save();
         res.send('Account registered successfully')
      }
      else{
        res.send('password doesnt matches ,plz try again')
      }

    }
});
}
async function validate(req,res,next)
{
  // ({$and:[{email:req.body.email},{password:req.body.password}]},function(error,docs)
  user.findOne({email:req.body.email,password:req.body.password},function(error,docs)
  {
    if(docs){
      
      // req.session.user = {"email": req.body.email};
      req.session.user = docs;
      req.session.save();
      res.status(200).send(docs);
   }
    else
    {
      res.status(404).send('invalid credientials');
      // res.status(404).send(error)
      // res.send('error');
      // res.send(req.session);
      
    }
   });
  
  // const email=user.find({email});
  // const password=user.find({password});
  // const email='rida.bsse3962@iiu.edu.pk';
  // const name='rida';
  // const password='5675';
  // if(email==req.body.email && password==req.body.password && name==req.body.name)
  // {
  //   res.send('logged in');
  // }
  // else{
  //   res.send('failed');
  // }
  // const first_user=new user({name:req.body.name, email:req.body.email,password:req.body.password});
  
  // first_user.save();
  
  // res.send('data added');
  
}
async function Donations(req,res,next){
  
  // user.findOne({email:req.body.email},function(error,docs){
  // if(docs)
  // {
     
  //   res.send('Already have an account')
  // }
  // else
  // {
    // if(req.body.password==req.body.confirm_password)
    // {
       const first_user=new user({name:req.body.name,email:req.body.email,password:req.body.password,confirm_password:req.body.confirm_password,phone_no:req.body.phone_no});
       first_user.save();
       res.send('Donated Successfully')
    // }
    // else{
    //   res.send('password doesnt matches ,plz try again')
    // }

   //}
//});
}
async function logout(req, res, next) {
  req.session.destroy(err => {
    if (err) 
    {
      res.send(err);
    } else {
      
      res.send('success'); // Redirect to the login page or any other page
    }
  });
}

async function EditProfile(req,res,next)
{
  const file = req.file;
  const file_path = file.path;
  if(file_path)
  {
    user.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {name:req.body.name, email:req.body.email, address:req.body.address, Phone_no:req.body.phone_no, role:req.body.role,User_img:file_path}, function(error,docs)
    {
      if(error)
      {
        res.send("Failed to update the  Record");
      }
      else
      {
       res.send("success");
      }
        
        // res.send(docs);
      })
  }
  else
  {
    user.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {name:req.body.name,email:req.body.email, address:req.body.address, Phone_no:req.body.phone_no, role:req.body.role}, function(error,docs)
    {
      if(error)
      {
        res.send("Failed to update the  Record");
      }
      else
      {
       res.send("success");
      }
        
        // res.send(docs);
      })
  }
  
 };


module.exports={get_data,get_marks,validate,register,registerNGO,Donations,logout,EditProfile};