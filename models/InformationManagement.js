const mongoose=require("mongoose");
const InformationSchema=new mongoose.Schema({
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
      dis_coordinates:{
        type: String,
        required:true,
      },
      population:{
        type:Number,
        required:true,

      }
      
});
const Information = mongoose.model("Information", InformationSchema);
module.exports = { Information };