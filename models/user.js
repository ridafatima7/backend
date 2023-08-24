const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    phone_no:{
        type:String,
        // required:true,
    },
    address:{
        type:String,
        // required:true,
    },
    account_no:{
        type:String,
        // required:true,
    },
    Account_Type:{
        type:String,
    },

    Total_Donations:{
        type:Number,
        default: 0
    },
    description:{
        type:String,
    },
    bio:{
        type:String
    },
    User_img:{
        type:String,
    },
    Status:{
        type:String,
    },



}, { timestamps: true });

const user=mongoose.model("user",userSchema);
module.exports={user};