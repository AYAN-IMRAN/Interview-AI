const mongoose = require("mongoose")



async function connectToDB() {

    try {
       const connect = await mongoose.connect(process.env.MONGODB_URI)

        if(!connect){
            console.log("Connection is Failed");
            
        }
        else{


            console.log("Database Connected Succesfully");
            
        }
    } catch (error) {
        console.log(error);
        
    }



    
}


module.exports = connectToDB