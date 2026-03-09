const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../services/ai.service.js')
const interviewReportModel = require('../models/interview.model.js')


/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */

async function genreteInterviewReportController(req, res) {
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescrption, jobDescription } = req.body

    const interviewReportByAI = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })


    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        jobDescription,
        ...interviewReportByAI
    })

    res.status(201).json({
        mssg: "Intreview Report Genreted Succesfully",
        interviewReport
    })

}


module.exports = genreteInterviewReportController