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
    password:{
        type:String,
        required:true,
    },
    confirm_password:{
        type:String,
        required:true,
    },
    phone_no:{
        type:Number,
        required:true,
    }

});

const user=mongoose.model("user",userSchema);
module.exports={user};