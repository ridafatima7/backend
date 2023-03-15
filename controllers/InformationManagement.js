var mongoose=require('mongoose');
const {Information}=require("../models/InformationManagement");

async function  AddInformation(req,res,next)
{
//   Information.findOne({Course_code:req.body.course_code},function(error,docs)
//   {
//     if(docs)
//     {
//       res.send("Course with the same coursecode exists");
//     }
//     else{

      const first_Information=new Information({dis_type:req.body.disasterType, dis_title:req.body.title, dis_area:req.body.area, dis_coordinates:req.body.coordinates, population:req.body.population});
      first_Information.save().then((result) => res.send("success"))
     .catch((error) => res.send(error));
     
      // res.send(docs);
    // }
//   })
}

async function GetInformation(req,res,next)
{
  const filter = {};
  const AllInformation = await Information.find(filter);
  res.send(AllInformation);
  
}
async function DeleteInformation(req,res,next)
{
  
  Information.findByIdAndRemove({_id: mongoose.Types.ObjectId(req.query.temp_id)}, (err) =>{

    if(err){
        res.send({"indicator":"error","messege":err}); 
    }
    else{
      res.send({"indicator":"success","messege":"Information deleted successfully"});

    }
 })
}
async function FindInformation(req,res,next)
{
  
  const InformationData = await Information.findOne({_id : mongoose.Types.ObjectId(req.query.temp_id)});
  res.send(InformationData);
};
async function  EditInformation(req,res,next)
{
  
  Information.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {dis_type:req.body.disasterType, dis_title:req.body.title, dis_area:req.body.area, dis_coordinates:req.body.coordinates, population:req.body.population}, function(error,docs)
  {
    if(error)
    {
      res.send("Failed to update the Information");
    }
    else
    {
     res.send("success");
    }
      
      // res.send(docs);
    })
 };
module.exports={AddInformation,GetInformation,DeleteInformation,EditInformation,FindInformation}