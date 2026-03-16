require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()


app.use(cors({
        origin: [
        'http://localhost:5173',
        'https://interview-ai-tau-eight.vercel.app',
        'https://your-backend.vercel.app' 
    ]
,
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend is working!',
    time: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    env: process.env.NODE_ENV || 'development',
    mongodb: process.env.MONGODB_URI ? 'configured' : 'missing'
  });
});


const authRouter = require('../src/routes/auth.route.js')
const interviewRouter = require('./routes/interview.route.js')




app.use('/api/auth',authRouter)
app.use('/api/interview' ,interviewRouter)




module.exports = app