const mongoose=require("mongoose");
const ContactUsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }

});

const Contact_Us=mongoose.model("ContactUs",ContactUsSchema);
module.exports={Contact_Us};