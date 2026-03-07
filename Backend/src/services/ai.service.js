const { GoogleGenAI } = require('@google/genai')
const z = require('zod')
const { zodToJsonSchema } = require('zod-to-json-schema')

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description. Be strict and realistic."),
    
    technicalQuestions: z.array(z.object({
        question: z.string().describe("A specific technical question likely to be asked in the interview, based on the job requirements and candidate's skill gaps"),
        intention: z.string().describe("The interviewer's intention behind asking this question — what they are trying to evaluate"),
        answer: z.string().describe("A detailed, structured answer guide: key points to cover, approach to take, example to mention if possible")
    })).describe("8 to 10 technical interview questions tailored to the job description and candidate's background"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("A behavioral question likely asked to assess soft skills, teamwork, problem-solving or leadership"),
        intention: z.string().describe("What the interviewer wants to understand about the candidate's personality or work style"),
        answer: z.string().describe("How to answer using the STAR method (Situation, Task, Action, Result) with specific guidance")
    })).describe("5 to 7 behavioral questions relevant to the role and company culture implied by the job description"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("A specific skill or technology mentioned or implied in the job description that the candidate lacks or needs to improve"),
        severity: z.enum(["low", "medium", "high"]).describe("How critical this gap is: high = must have for the job, medium = preferred, low = good to have")
    })).describe("All identified skill gaps between the candidate's profile and job requirements"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("Day number starting from 1"),
        focus: z.string().describe("The main theme for the day e.g. 'System Design Basics', 'JavaScript Advanced Concepts', 'Mock Behavioral Interview'"),
        tasks: z.array(z.string()).describe("3 to 5 specific, actionable tasks for the day — include resources like YouTube channels, docs, or practice sites where helpful")
    })).describe("A realistic 7-day preparation plan targeting the candidate's weakest areas first"),

    title: z.string().describe("The exact job title extracted from the job description"),
})


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `
You are an expert technical interview coach and career advisor with 15+ years of experience helping candidates land jobs at top tech companies.

Your task is to analyze the candidate's profile against the job description and generate a comprehensive, personalized interview preparation report.

---

## CANDIDATE PROFILE:

### Resume:
${resume || "Not provided"}

### Candidate's Self Description:
${selfDescription || "Not provided"}

---

## TARGET JOB:

### Job Description:
${jobDescription}

---

## YOUR INSTRUCTIONS:

1. **Match Score**: Honestly evaluate how well the candidate fits this role (0-100). Consider skills, experience level, and keywords.

2. **Technical Questions**: Generate 8-10 questions SPECIFICALLY based on:
   - Technologies mentioned in the job description
   - Candidate's weak areas from their resume
   - Common questions for this specific role/level
   - Each answer must be detailed with key points to cover

3. **Behavioral Questions**: Generate 5-7 questions focused on:
   - Scenarios relevant to this specific job role
   - Leadership, teamwork, conflict resolution as relevant
   - Guide answers using STAR method

4. **Skill Gaps**: Be honest and specific — list every gap between what the job needs and what candidate has

5. **Preparation Plan**: Create a focused 7-day plan that:
   - Prioritizes HIGH severity skill gaps first
   - Includes specific resources (e.g. "Practice arrays on LeetCode", "Watch Fireship JWT video")
   - Is realistic for a working candidate (3-5 tasks per day max)

Be specific, practical, and encouraging. This report should genuinely help the candidate succeed.
`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    })

    const result = JSON.parse(response.text)
    return result
}


module.exports = generateInterviewReport