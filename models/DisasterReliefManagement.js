const mongoose=require("mongoose");
const ReliefSchema=new mongoose.Schema({
    dis_type: {
        type: String,
        required: true,
      }, 
      dis_title: {
        type: String,
        required: true,
      },
      dis_area:{
        type: String,
        required:true,
      },
      dis_coordinatesX:{
        type: String,
        required:true,
      },
      dis_coordinatesY:{
        type: String,
        required:true,
      },
      population:{
        type:Number,
        required:true,

      },
      survivors:{
        type:Number,
        required:true,
      },
      deaths:{
        type: Number,
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
        required:true,
      },
      added_by:{
        type:String,
        required:true,

      }
      
});
const ReliefInfo = mongoose.model("Relief_Information", ReliefSchema);
module.exports = { ReliefInfo };