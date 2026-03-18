import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../prompts/system-prompt";

export async function callGemini(userPrompt: string): Promise<string> {

    // search for existing API key
    const key = process.env.GEMINI_API_KEY;

    if (!key) {
        throw new Error("Missing GEMINI_API_KEY");
    }

    // call gemini model and return text response or error
    const ai = new GoogleGenAI({ apiKey: key });
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [
                {
                    role: "system",
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                {
                    role: "user",
                    parts: [{ text: userPrompt }],
                },
            ],
        });

        const text = response.text;

        if (!text) {
            throw new Error("Gemini returned empty text");
        }

        return text;
    } catch (error) {
        console.error("Gemini error:", error);
        throw new Error("Failed to generate Gemini response");
    }
}