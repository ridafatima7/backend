const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
   username:{
        type:String,
        required:true,
    },
    phone_no:{
        type:Number,
        required:true,
    }
    
    // role:{
    //     type:String,
    //     required:true,
    // }

});

const Donation=mongoose.model("Donations",userSchema);
module.exports={Donation};