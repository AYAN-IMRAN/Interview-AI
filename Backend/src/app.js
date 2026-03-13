require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()


app.use(cors({
    origin:['http://localhost:5173',
        'https://interview-ai-tau-eight.vercel.app/'
    ]
,
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())


const authRouter = require('../src/routes/auth.route')
const interviewRouter = require('./routes/interview.route.js')




app.use('/api/auth',authRouter)
app.use('/api/interview' ,interviewRouter)




module.exports = app