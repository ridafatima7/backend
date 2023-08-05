const mongoose=require("mongoose");
const NGOsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    // password:{
    //     type:String,
    //     required:true,
    // },
    // confirm_password:{
    //     type:String,
    //     required:true,
    // }, // NGO yaha se login ho rhi ha?
    phone_no:{
        type:Number,
        required:true,
    }

});

const ngo=mongoose.model("ngo",NGOsSchema);
module.exports={ngo};