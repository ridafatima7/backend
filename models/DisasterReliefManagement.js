const mongoose=require("mongoose");
const ReliefSchema=new mongoose.Schema({
    Ngo_Name: {
      type: String,
      required: true,
    }, 
     dis_type: {
        type: String,
        required: true,
      }, 
      dis_title: {
        type: String,
        required: true,
      },
      population:{
        type:Number,
        required:true,
      },
      date:{
        type: String,
        required:true,
      },
      shelters:{
        type: Number,
        required:true,
      },
      food:{
        type: Number,
        required:true,
      },
      medicine:{
        type: Number,
        required:true,
      },
      gallery:{
        type: String,
      },
      added_by:{
        type:String,
        required:true,
      }
      
});
const ReliefInfo = mongoose.model("Relief_Information", ReliefSchema);
module.exports = { ReliefInfo };