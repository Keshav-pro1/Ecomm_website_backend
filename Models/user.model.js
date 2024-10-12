
const mongoose = require("mongoose");

/* 
Things to added about use
* userID
* username
* password
* email
* usertype
*/
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        
    },
    userID:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        lowecase:true,
        minlength:10
    },
    usertype:{
        type:String,
        default:"CUSTOMER",
        enum: ["CUSTOMER","ADMIN"]
    }
},{timestamps: true, versionKey:false})

module.exports= mongoose.model("User", userSchema)