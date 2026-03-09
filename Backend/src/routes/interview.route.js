const express = require('express')
const pdfParse = require('pdf-parse')
const authMiddleware = require('../middlewares/auth.middleware.js')
const interviewController = require('../controllers/interview.controller.js')
const upload = require('../middlewares/file.middleware.js')



const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */


interviewRouter.post('/',authMiddleware.authUser,upload.single('resume') ,interviewController.genreteInterviewReportController)












module.exports = interviewRouter