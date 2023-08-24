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
    Amount:{
        type:String,
        required:true,
    },
    NGO:{
        type:String,
        required:true,
    },
    phone_no:{
        type:Number,
        required:true,
    },
    Account_Holder:{
        type:String,
        // required:true,
    },
    Account_Number:{
        type:String,
        required:true,
    },
    Expiry_Date:{
        type:String,
        required:true,
    },
    Date:{
        type:String,
        // required:true,
    },
    Hide_Info:{
        type:String,
        required:true,
    },
    added_by:{
        type:String,
    }
    // role:{
    //     type:String,
    //     required:true,
    // }

}, { timestamps: true });

const Donation=mongoose.model("Donations",userSchema);
module.exports={Donation};