const { GoogleGenAI }= require('@google/genai')


const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})


async function InvodekedAIGemini() {

    const reponse = await ai.models.generateContent({
        model:"gemini-2.5-flash-lite",
        contents:"Hello Gemini ! explain interview in short"
    })


    console.log(reponse.text);
    
    
}


module.exports = InvodekedAIGemini