require("dotenv").config();

const app = require("./src/app.js");
const connectToDB = require("./src/config/database.js");
const generateInterviewReport = require("./src/services/ai.service.js");








connectToDB()
generateInterviewReport(resume,selfDescription,jobDescription)




app.listen(3000,() =>{
    console.log("APP IS RUNNING PORT 3000");
    
})