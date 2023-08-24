const e = require("express");
var mongoose=require('mongoose');
const {user}=require("../models/user");
const sendEmail = require('../email');
const moment = require('moment');

async function get_data(req,res,next)
{
  res.send(req.query.name);
}
async function get_marks(req,res,next)
{
  res.send(req.query.marks);
}
async function GetUser(req, res, next) {
  if(req.query.startDate && req.query.endDate){
    let startDate = ""
    let endDate = ""
    if(req.query.startDate)
    {
      startDate = moment(req.query.startDate).startOf('day').toDate()
    }
    else
    {
      startDate = moment("1979-01-01").startOf('day').toDate()
    }
    if(req.query.endDate)
    {
      endDate = moment(req.query.endDate).endOf('day').toDate()
    }
    else
    {
      endDate = new moment().endOf('day').toDate()
    }
    console.log("Start Date: " + startDate)
    console.log("End Date: " + endDate)
    const filter = 
    {
      role: "NGO",
      createdAt: {$gte: startDate, $lte: endDate}
    };
    const AllInformation = await user.find(filter);
    res.send(AllInformation);
  }
  else if(req.query.NGO)
  {
      const NGO=req.query.NGO;
      const AllInformation = await user.find({name:NGO});
      console.log("NGO");
      res.send(AllInformation);
  }
  else
  {
    const filter = {};
    const AllInformation = await user.find(filter);
    console.log("All");
    res.send(AllInformation);
  }
 

}
async function register(req,res,next){
  
    user.findOne({email:req.body.email},function(error,docs)
    {
     if(docs)
     {
       
      res.send('Already have an account')
     }
     else
     {
      user.findOne({username:req.body.username},function(error1,docs1)
      {
        if(docs1)
        {
          res.send('Username already exists!')
        }
        else
        {
          const first_user=new user({name:req.body.name,username:req.body.username,email:req.body.email,password:req.body.password,confirm_password:req.body.confirm_password,phone_no:req.body.phone_no,address:req.body.address,account_no:req.body.accountno,
            Account_Type:req.body.account_Type,description:req.body.description,role:req.body.role,Status:req.body.Status}); 
          // first_user.save();
          
            const userEmail = req.body.email; 
            const subject = 'Account Registration Request Status!';
            let message = '';

           if (req.body.Status === 'Pending') {
            message = 'We have received your account registration request. We will let you know soon about the status of your account.';
           } else if (req.body.Status === 'Active') {
            message = 'Congratulations! Your account has been registered successfully.';
           }
           first_user.save(function (error, userDoc) {
            if (error) {
              res.send({ indicator: 'error', message: 'Failed to register account.' });
            } else {
              try {
                sendEmail(userEmail, subject, message);
                let responseMessage = '';
                if (userDoc.Status === 'Pending') {
                responseMessage = 'Account registration request has sent';
                } else if (userDoc.Status === 'Active') {
                responseMessage = 'Account registered successfully';
                }
                res.send({
                  indicator: 'success',
                  message: responseMessage,
                });
              } catch (error) {
                res.send({
                  indicator: 'success',
                  message: 'Account registered successfully but email was not sent',
                });
              }
            }
          });
        
            // try {
            //   sendEmail(userEmail, subject, message);
            //   res.send('Account registered successfully')
            // } catch (error) {
            //   res.send('Account registered successfully but email was not sent')
            // }
          
        }
      })
      // if(req.body.password==req.body.confirm_password)
      // {
         
      // }
      // else{
      //   res.send('password doesnt matches ,plz try again')
      // }

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
      if (docs.role === 'NGO' && docs.Status === 'Active') {
        console.log(docs);
        req.session.user = docs;
        req.session.save();
        res.status(200).send(docs);
      } 
      else if (docs.role === 'DEO' || docs.role === 'admin' || docs.role === 'Donor'){
      // req.session.user = {"email": req.body.email};
      req.session.user = docs;
      req.session.save();
      res.status(200).send(docs);
      }
      else {
        res.status(400).send('Unauthorised User or your account is not active!');
      }
   }
    else
    {
      user.findOne({ email: req.body.email }, function (error, emailDocs) {
        if (emailDocs) 
        {
          res.status(200).send('Password is incorrect');
        }
        else 
        {
          res.status(200).send('Email not found');
        }
      });
      // res.status(404).send('invalid credientials');
      // res.status(404).send(error)
      //  res.send(error);
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
async function deleteUser(req,res,next){
  const role = req.session.user.role;
   if (role == "admin") {
    user.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.query.temp_id) }, (err) => {
       if (err) {
         res.send({ "indicator": "error", "messege": err });
       }
       else {
         res.send({ "indicator": "success", "messege": "NGO removed successfully" });
       }
     })
   }
   else {
     res.status(403).send("Login First");
   }
  
  
}
async function FindUser(req, res, next) {
  
  const InformationData = await user.findOne({ _id: mongoose.Types.ObjectId(req.query.temp_id) });
  res.send(InformationData);
};
async function EditUser(req, res, next) {
  const role = req.session.user.role;
  // const filePaths = req.files.map(file => file.path);
  if (role == "admin") {

    const userId = mongoose.Types.ObjectId(req.body.id);
    const existingUser = await user.findOne({
      $or: [
        { email: req.body.email, _id: { $ne: userId } },
        { username: req.body.username, _id: { $ne: userId } }
      ]
    });

    if (existingUser) 
    {
      if (existingUser.email === req.body.email) 
      {
        return res.status(400).send("Email already exists.");
      } else if (existingUser.username === req.body.username)
       {
        return res.status(400).send("Username already exists.");
       }
    }
    user.findById(mongoose.Types.ObjectId(req.body.id), 'Status email', function (error, existingUser) {
      if (error) {
        res.send("Failed to retrieve user information");
      } else {
        const existingStatus = existingUser.Status;
        const newStatus = req.body.Status;
        const userEmail = req.body.email;
    user.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), { name:req.body.name,username:req.body.username,email:req.body.email,password:req.body.password,confirm_password:req.body.confirm_password,phone_no:req.body.phone_no,address:req.body.address,account_no:req.body.accountno,Account_Type:req.body.account_Type,
      description:req.body.description,role:req.body.role,Status:req.body.Status}, 
      function (error, updatedUser) {
        if (error) 
        {
          res.send(error);
        } 
        else 
        {
          const subject = `Account Status: ${newStatus}`;
          let message = "";

          if (newStatus === "Active" && existingStatus === "Pending") {
                 message = "Your account has been registered successfully.";
          } else if (newStatus === "Rejected" && existingStatus === "Pending") {
                 message = "Unfortunately, your account registration request has been rejected.";
          }
          else if ((newStatus === "Pending" && existingStatus === "Active") || (newStatus === "Pending" && existingStatus === "Rejected") || (newStatus === "Active" && existingStatus === "Rejected")|| (newStatus === "Rejected" && existingStatus === "Active")) {
            message = "Your account registration Status has been changed from "+ existingStatus + " to "+ newStatus +".";
          }
          if (message !== "") {
            try {
              sendEmail(userEmail, subject, message);
              res.send("success");
            } 
            catch (error) {
              res.send("success but email was not sent");
            }
          } else {
            res.send("success");
          }
        }
      }
    
    //   function (error, docs) {
    //   if (error) {
    //     res.send("Failed to update the user Information");
    //   }
    //   else {
    //     res.send("success");
    //   }

    //   // res.send(docs);
    // }
    )
  }
  });
  }
  else {
    res.status(403).send("Plz Login First");
  }

};
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
// async function Editpicture(req, res, next)
// {

// }

async function EditProfile(req,res,next)
{
  
  file_path = null
  if(req.file)
  {
    const file = req.file;
    file_path = file.path;
  }
  const existingUser = await user.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
    _id: { $ne: mongoose.Types.ObjectId(req.body.id) }, 
  });
  if (existingUser) 
  {
    if (existingUser.email === req.body.email) 
    {
      return res.status(200).send({
        indicator: 'error',
        message: 'Email already exists.',
      });
    } 
    else if (existingUser.username === req.body.username) {
      return res.status(200).send({
        indicator: 'error',
        message: 'Username already exists.',
      });
    }
  }
  if(file_path)
  {

    user.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {name:req.body.name, email:req.body.email,username:req.body.username, address:req.body.address, Phone_no:req.body.phone_no,description:req.body.description, role:req.body.role,User_img:file_path}, function(error,docs)
    {
      if(error)
      {
        res.send({"indicator": "error", "messege": "Failed to update your profile" });
      }
      else
      {
        res.send({'indicator': 'success', 'path' : file_path, "messege": "Profile Updated successfully" })
      }
        
        // res.send(docs);
      })
  }
  else
  {
    
    user.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {name:req.body.name,email:req.body.email,username:req.body.username, address:req.body.address, Phone_no:req.body.phone_no,description:req.body.description, role:req.body.role}, function(error,docs)
    {
      if(error)
      {
        res.send({"indicator": "error", "messege": err });
      }
      else
      {
        res.send({'indicator': 'success', 'path' : null, "messege": "Profile Updated successfully" })
      }
        
        // res.send(docs);
      })
  }
  
 };
module.exports={logout,get_data,get_marks,validate,EditUser,register,FindUser,registerNGO,GetUser,EditProfile,deleteUser};