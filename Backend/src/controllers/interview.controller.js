const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/interview.model')


/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */

async function genreteInterviewReportController(req,res) {
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
const {selfDescrption,jobDescription } = req.body

const interviewReportByAI = await generateInterviewReport({
    resume:resumeContent.text,
    selfDescription,
    jobDescription
})

    
}