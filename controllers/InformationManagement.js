var mongoose = require('mongoose');
const { Information } = require("../models/InformationManagement");
const moment = require('moment');

async function AddInformation(req, res, next) {
  const filePaths = req.files.map(file => file.path);
  if (req.session.user)
   {
    const role = req.session.user.role;
    if (role == "DEO" || role == "admin") {
      const first_Information = new Information({ dis_type: req.body.disasterType, dis_title: req.body.title,Description:req.body.Description, dis_area: req.body.area, population: req.body.population,survivors: req.body.survivors, 
        deaths: req.body.deaths,date: req.body.date,shelters: req.body.shelters,food: req.body.food,medicine: req.body.medicine,added_by: req.session.user._id, gallery: filePaths });
      first_Information.save().then((result) => res.send("success"))
        .catch((error) => res.send(error));

    }
    else {
      res.status(403).send("forbidden,Try again");
    }
  }
  else {
    res.status(403).send("Forbidden, Login First");
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
   const Role=req.session.user.role;
   const roleId=req.session.user._id;
   const filter = {};
    if(Role==="DEO" || Role==="NGO")
    {
      const AllInformation = await Information.find({added_by : roleId}); 
      res.send(AllInformation);
    }
    else if(Role==="admin")
    {
      const AllInformation = await Information.find(filter);
      res.send(AllInformation);
    }
    else
    {
       res.send("Failed to Fetch Data");
    }
}
async function GetDisaster(req, res, next) {
  // const filter = {};
  const id=req.query.id
  const AllInformation = await Information.find({_id:id});
  res.send(AllInformation);

}
async function GetInformationHome(req, res, next) {
  const filter = {};
  const AllInformation = await Information.find(filter).limit(6)
  res.send(AllInformation);
}
async function GetInformationDetail(req, res, next) {
  const filter = {};
  const AllInformation = await Information.find(filter);
  res.send(AllInformation);
}
async function DeleteInformation(req, res, next) {
  const role = req.session.user.role;
  if (role == "DEO" || role == "admin") {
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
  const filePaths = req.files.map(file => file.path);
  if (role == "DEO" || role == "admin") {
    if(filePaths.length > 0)
    {
      Information.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), { dis_type: req.body.disasterType, dis_title: req.body.title, Description:req.body.Description, population: req.body.population,survivors:req.body.survivors,deaths:req.body.deaths,
        date: req.body.date,shelters: req.body.shelters,food: req.body.food,medicine: req.body.medicine,added_by: req.session.user._id, gallery: filePaths }, 
        function (error, docs) {
        if (error) {
          res.send("Failed to update the Information");
        }
        else {
          res.send("success");
        }
  
        // res.send(docs);
      })
    }
    else if(filePaths.length == 0)
    {
      Information.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), { dis_type: req.body.disasterType, dis_title: req.body.title, Description:req.body.Description, population: req.body.population,survivors:req.body.survivors,deaths:req.body.deaths,
        date: req.body.date,shelters: req.body.shelters,food: req.body.food,medicine: req.body.medicine,added_by: req.session.user._id }, 
        function (error, docs) {
        if (error) {
          res.send("Failed to update the Information");
        }
        else {
          res.send("success");
        }
  
        // res.send(docs);
      })
    }
    
  }
  else {
    res.status(403).send("Forbidden");
  }

};
async function DisasterReport(req, res, next) {
  try
  {
   const { disasterType, startDate, endDate } = req.body;
  //  function getCasualtiesRange(casualties) {
  //   switch (casualties) {
  //     case 'Any':
  //       return { $gte: 0 }; 
  //     case 'Upto 1000':
  //       return { $lte: 1000 }; 
  //     case 'More than 1000 but Less than 2000':
  //       return { $gt: 1000, $lt: 2000 }; 
  //     case 'Upto 2000':
  //       return { $lte: 2000 }; 
  //     default:
  //       return { $gte: 0 };
  //   }
  // }
  function getDisasterTyp(disasterType) {
    switch (disasterType) {
      case 'All Disasters':
        return { }; 
      case 'Provincial':
        return { type: 'Provincial'}; 
      case 'Local':
        return { type: 'Local' }; 
      case 'National':
        return {type: 'National'}; 
      default:
        return { };
    }
  }
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
    dis_type:disasterType,
    createdAt: { $gte: start_Date, $lte: end_Date },
  
   };
   const reports = await Information.find(query);
  //  res.json(reports);
   res.send(reports);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

}
module.exports = { GetInformationDetail,DisasterReport,AddInformation,GetInformationHome,GetDisaster, GetInformation, DeleteInformation, EditInformation, FindInformation }