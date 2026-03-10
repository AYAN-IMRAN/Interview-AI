const { GoogleGenAI } = require('@google/genai')

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})


const responseSchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
            description: "The exact job title extracted from the job description"
        },
        matchScore: {
            type: "number",
            description: "A score between 0 and 100 indicating how well the candidate matches the job"
        },
        technicalQuestions: {
            type: "array",
            description: "8 to 10 technical interview questions tailored to the job and candidate",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The technical interview question" },
                    intention: { type: "string", description: "Why the interviewer is asking this" },
                    answer: { type: "string", description: "Detailed guide on how to answer this question" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: "array",
            description: "5 to 7 behavioral questions relevant to the role",
            items: {
                type: "object",
                properties: {
                    question: { type: "string", description: "The behavioral interview question" },
                    intention: { type: "string", description: "What the interviewer wants to assess" },
                    answer: { type: "string", description: "How to answer using the STAR method" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: "array",
            description: "All skill gaps between candidate profile and job requirements",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string", description: "The missing or weak skill" },
                    severity: {
                        type: "string",
                        enum: ["low", "medium", "high"],
                        description: "How critical this gap is for the job"
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: "array",
            description: "A realistic 7-day preparation plan",
            items: {
                type: "object",
                properties: {
                    day: { type: "number", description: "Day number starting from 1" },
                    focus: { type: "string", description: "Main topic for the day" },
                    tasks: {
                        type: "array",
                        items: { type: "string" },
                        description: "3 to 5 specific actionable tasks for the day"
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        }
    },
    required: ["title", "matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
}


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `
You are an expert technical interview coach with 15+ years of experience helping candidates land jobs at top tech companies.

Analyze the candidate's profile against the job description and generate a comprehensive, personalized interview preparation report.

## CANDIDATE PROFILE:

### Resume:
${resume || "Not provided"}

### Candidate's Self Description:
${selfDescription || "Not provided"}

## TARGET JOB:

### Job Description:
${jobDescription}

## YOUR INSTRUCTIONS:

1. **Match Score**: Honestly score 0-100 based on skills, experience, and keyword match.

2. **Technical Questions**: Generate 8-10 questions based on:
   - Technologies in the job description
   - Candidate's weak areas
   - Common questions for this role/level
   - Provide detailed answer guides

3. **Behavioral Questions**: Generate 5-7 questions with STAR method answer guides

4. **Skill Gaps**: List every gap between job needs and candidate skills with severity

5. **Preparation Plan**: 7-day plan prioritizing HIGH severity gaps first with specific resources

Be specific, practical, and helpful. This report should genuinely help the candidate succeed.
`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema
        }
    })
console.log(response.text);

    const result = JSON.parse(response.text)
    return result
}

module.exports = generateInterviewReport