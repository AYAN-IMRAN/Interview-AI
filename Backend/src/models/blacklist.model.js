const mongoose = require('mongoose')


const blackListTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token Is Required for adding to Blacklist"]

    }
},
{timestamps:true}
)


const tokenBlacklistModel = mongoose.model("blacklListTokens",blackListTokenSchema)


module.exports = tokenBlacklistModel