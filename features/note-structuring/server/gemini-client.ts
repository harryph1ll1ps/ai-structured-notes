import { GoogleGenAI } from "@google/genai";

export async function callGemini(prompt: string): Promise<string> {
    const key = process.env.GEMINI_API_KEY;

    if (!key) {
        throw new Error("Missing GEMINI_API_KEY");
    }

    const ai = new GoogleGenAI({ apiKey: key });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
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