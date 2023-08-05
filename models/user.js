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
    phone_no:{
        type:Number,
        // required:true,
    },
    role:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        // required:true,
    },
    account_no:{
        type:Number,
        // required:true,
    },
    description:{
        type:String,
        // required:true,
    },
    bio:{
        type:String
    },
    User_img:{
        type:String,
    }


});

const user=mongoose.model("user",userSchema);
module.exports={user};