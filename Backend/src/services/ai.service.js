const { GoogleGenAI } = require('@google/genai')
const puppeteer = require("puppeteer")

const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

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






// ── PDF from HTML ─────────────────────────────────────────────────────────────
async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  
  await page.addStyleTag({
    content: `
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      @page { margin: 0; }
    `,
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "18mm", bottom: "18mm", left: "15mm", right: "15mm" },
  });

  await browser.close();
  return pdfBuffer;
}

// ── Resume PDF Generator ──────────────────────────────────────────────────────
async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "Complete, self-contained HTML document for the resume. Must include all CSS inline inside a <style> tag. No external dependencies."
      ),
  });

  const prompt = `
You are an expert resume writer and frontend developer. Your task is to generate a COMPLETE, SELF-CONTAINED HTML resume that is:
- Tailored specifically to the provided job description
- Visually professional and modern — not a plain text dump
- ATS-friendly (clear headings, no tables for layout, no images, no icons that break parsing)
- Honest — based ONLY on the candidate's actual experience and skills provided
- Natural-sounding — NOT AI-generated tone, write like a real human professional would
- 1 page maximum (strictly — the PDF must not overflow onto page 2 unless the candidate has 5+ years of experience)

═══════════════════════════════════
CANDIDATE DATA
═══════════════════════════════════
Resume / Experience:
${resume || "Not provided"}

Self Description:
${selfDescription || "Not provided"}

Target Job Description:
${jobDescription}

═══════════════════════════════════
DESIGN REQUIREMENTS (follow exactly)
═══════════════════════════════════
1. COLOR SCHEME: Use a clean, professional palette. Suggested: deep navy (#1a2744) for headers/accents, white background (#ffffff), dark gray (#2d2d2d) for body text, light gray (#f4f6f8) for section backgrounds. You may use a subtle left border accent (3px solid navy) on section headings.

2. TYPOGRAPHY:
   - Import Google Fonts: "Inter" (body) via @import in the <style> tag
   - Name: 22–26px, bold, navy color
   - Section headings: 11px, uppercase, letter-spacing: 1.5px, navy
   - Body text: 10–11px, line-height 1.5, #2d2d2d
   - Keep font sizes small to fit on 1 page

3. LAYOUT:
   - Single column OR two-column (left sidebar for contact/skills, right for experience)
   - Use CSS flexbox or grid — NO HTML tables for layout
   - Padding: 0 (page margins handled by puppeteer)
   - Sections: Name + Contact → Summary → Experience → Skills → Education
   - Only include sections that have real data from the candidate

4. SECTIONS TO INCLUDE (only if data exists):
   - Header: Full name, email, phone (if available), LinkedIn/GitHub (if mentioned), city
   - Professional Summary: 2–3 sentences, first-person, confident but not arrogant. Tailored to the job.
   - Work Experience: Company, Role, Date range, 3–4 bullet points using action verbs + quantified results where possible
   - Skills: Grouped by category (e.g., Frontend, Backend, Tools). Use inline tags or comma-separated. Match skills from the job description.
   - Education: Degree, Institution, Year
   - Projects (if mentioned and relevant): Name, 1-line description, tech stack

5. ATS RULES (critical):
   - All text must be selectable (no text-as-image)
   - Use semantic HTML: <h1>, <h2>, <h3>, <p>, <ul>, <li>
   - NO SVG icons, NO background images, NO canvas
   - Section titles must be plain text (not inside SVGs or pseudo-elements)
   - Keep skill keywords from the job description naturally present in the text

6. CONTENT RULES:
   - Do NOT fabricate experience, companies, or qualifications not mentioned in the candidate data
   - Do NOT use phrases like "dynamic professional", "results-driven", "passionate about" — too cliché
   - Use specific, concrete language: "Built X using Y, reducing Z by N%"
   - If the candidate is a student or junior, reflect that honestly — highlight projects, learning, and enthusiasm for growth
   - Match the job description keywords naturally but do not keyword-stuff

7. FINAL OUTPUT:
   - Return a single complete HTML document starting with <!DOCTYPE html>
   - All CSS must be inside a <style> tag in the <head>
   - No external CSS files, no JavaScript, no external fonts via link tag — use @import inside <style>
   - The HTML must render correctly when converted to PDF by puppeteer with printBackground: true

Return ONLY the JSON object with the "html" field. No explanation, no markdown, no extra text.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
      temperature: 0.4,   // lower = more consistent, professional output
      maxOutputTokens: 8192,
    },
  });

  const jsonContent = JSON.parse(response.text);

  if (!jsonContent.html || jsonContent.html.trim().length < 200) {
    throw new Error("AI returned empty or invalid HTML for the resume.");
  }

  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
  return pdfBuffer;
}



module.exports = {generateInterviewReport,generateResumePdf}