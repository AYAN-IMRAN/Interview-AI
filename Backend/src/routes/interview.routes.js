const express = require('express')
const pdfParse = require('pdf-parse')
const authMiddleware = require('../middlewares/auth.middleware')
const interviewController = require('../controllers/interview.controller.js')



const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */


interviewRouter.post('/api/interview',authMiddleware.authUser,interviewController.genreteInterviewReportController)
