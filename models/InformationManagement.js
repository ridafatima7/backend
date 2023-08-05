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
      Description: {
        type: String,
        required: true,
      },
      dis_area:{
        type: String,
        required:true,
      },
      dis_coordinatesX:{
        type: String,
        
      },
      dis_coordinatesY:{
        type: String,
        
      },
      population:{
        type:Number,
        required:true,

      },
      survivors:{
        type:Number,
        
      },
      deaths:{
        type: Number,
        
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
const Information = mongoose.model("Information", InformationSchema);
module.exports = { Information };