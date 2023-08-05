var mongoose = require('mongoose');
const {ReliefInfo} = require("../models/DisasterReliefManagement");
// const {ReliefInfo ReliefInformation } = require("../models/DisasterReliefManagement");

async function AddInformation(req, res, next) {
  const filePaths = req.files.map(file => file.path);
  if (req.session.user) {
    const role = req.session.user.role;
    if (role == "NGO" || role == "DEO" || role == "admin" ) {
      const first_Information = new ReliefInfo({ Ngo_Name:req.body.ngoname,dis_type: req.body.disasterType, dis_title: req.body.title,description:req.body.Description, population: req.body.population, 
       date: req.body.date,shelters: req.body.shelters,food: req.body.food,medicine: req.body.medicine,Thumbnail:req.body.thumbnail,added_by: req.session.user._id, gallery: filePaths });
      first_Information.save().then((result) => res.send("success"))
        .catch((error) => res.send(error));

    }
    else {
      res.status(403).send("Not Alowed to access");
    }
  }
  else {
    res.status(403).send("plz login firist");
  }
  //   Information.findOne({Course_code:req.body.course_code},function(error,docs)
  //   {
  //     if(docs)
  //     {
  //       res.send("Course with the same coursecode exists");
  //     }
  //     else{


  // res.send(docs);
  // }
  //   })
}

async function GetInformation(req, res, next) {
  const filter = {};
   const Role=req.session.user.role;
   const roleId=req.session.user._id;
   if(Role=="NGO" ||  Role=="admin" || Role=="DEO")
   {
    const AllInformation = await ReliefInfo.find({added_by : roleId}); 
    res.send(AllInformation);
   }
    else
    {
      const AllInformation = await ReliefInfo.find(filter);
      res.send(AllInformation);
    }
  
} 
async function GetInformationHome(req, res, next) {
  const filter = {};
      const AllInformation = await ReliefInfo.find(filter)
      res.send(AllInformation);
} 

async function DeleteInformation(req, res, next) {
  const role = req.session.user.role;
  if (role == "NGO" || role == "DEO" || role == "admin" ) {
    ReliefInfo.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.query.temp_id) }, (err) => {

      if (err) 
      {
        res.send({ "indicator": "error", "messege": err });
      }
      else 
      {
        res.send({ "indicator": "success", "messege": "Information deleted successfully" });

      }
    })
  }

  else {
    res.status(403).send("Forbidden");
  }

}
async function FindInformation(req, res, next) {

  const InformationData = await ReliefInfo.findOne({ _id: mongoose.Types.ObjectId(req.query.temp_id) });
  res.send(InformationData);
};

async function EditInformation(req, res, next) {
  const role = req.session.user.role;
  if (role == "NGO" || role == "DEO" || role == "admin" ) {

    ReliefInfo.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {Ngo_Name:req.body.ngoname,dis_type: req.body.disasterType, dis_title: req.body.title, description:req.body.Description, population: req.body.population 
      ,date: req.body.date,shelters: req.body.shelters,food: req.body.food,medicine: req.body.medicine,gallery: req.body.gallery,added_by: req.session.user._id }, function (error, docs) {
      if (error) {
        res.send("Failed to update the Information");
      }
      else {
        res.send("success");
      }

      // res.send(docs);
    })
  }
  else {
    res.status(403).send("Forbidden");
  }

};
async function GetReliefActivity(req, res, next) {
  const id=req.query.id;
  const AllInformation = await ReliefInfo.find({_id:id});
  res.send(AllInformation);
}
module.exports = { GetReliefActivity,AddInformation, GetInformationHome, GetInformation, DeleteInformation, EditInformation, FindInformation }