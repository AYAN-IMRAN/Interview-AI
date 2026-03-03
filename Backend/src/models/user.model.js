const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already Taken try something new"],
        required:true,
    },

    email:{
        type:String,
        unique:[true,"Email already exists"],
        required:true,
    },

    password:{
        type:String,
        required:true,
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel