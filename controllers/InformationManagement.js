var mongoose = require('mongoose');
const { Information } = require("../models/InformationManagement");

async function AddInformation(req, res, next) {
  if (req.session.user) {
    const role = req.session.user.role;
    if (role == "NGO") {
      const first_Information = new Information({ dis_type: req.body.disasterType, dis_title: req.body.title, dis_area: req.body.area, dis_coordinatesX: req.body.xcoordinates,dis_coordinatesY: req.body.ycoordinates, population: req.body.population,survivors: req.body.survivors, 
        deaths: req.body.deaths,date: req.body.date,shelters: req.body.shelters,food: req.body.food,medicine: req.body.medicine,gallery: req.body.gallery,added_by: req.session.user._id });
      first_Information.save().then((result) => res.send("success"))
        .catch((error) => res.send(error));

    }
    else {
      res.status(403).send("Forbidden");
    }
  }
  else {
    res.status(403).send("Forbidden");
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
  const AllInformation = await Information.find(filter);
  res.send(AllInformation);

}
async function DeleteInformation(req, res, next) {
  const role = req.session.user.role;
  if (role == "NGO") {
    Information.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.query.temp_id) }, (err) => {

      if (err) {
        res.send({ "indicator": "error", "messege": err });
      }
      else {
        res.send({ "indicator": "success", "messege": "Information deleted successfully" });

      }
    })
  }

  else {
    res.status(403).send("Forbidden");
  }

}
async function FindInformation(req, res, next) {
  
  const InformationData = await Information.findOne({ _id: mongoose.Types.ObjectId(req.query.temp_id) });
  res.send(InformationData);
};

async function EditInformation(req, res, next) {
  const role = req.session.user.role;
  if (role == "NGO") {
    Information.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), { dis_type: req.body.disasterType, dis_title: req.body.title, population: req.body.population 
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
module.exports = { AddInformation, GetInformation, DeleteInformation, EditInformation, FindInformation }