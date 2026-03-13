import { Mode } from "@/app/types/structure";
import { GoogleGenAI } from "@google/genai";

function buildPrompt(note: string, mode: Mode): string {
    switch (mode) {
        case "summary":
            return `Summarise the following notes into a concise bullet-point summary:\n\n${note}`;

        case "actions":
            return `Extract clear action items from the following notes:\n\n${note}`;

        case "questions":
            return `Generate follow-up questions based on the following notes:\n\n${note}`;

        default: {
            const _exhaustive: never = mode;
            throw new Error(`Unhandled mode: ${_exhaustive}`);
        }
    }
}

async function callGemini(prompt: string): Promise<string> {
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

export async function generateStructuredOutput(note: string, mode: Mode): Promise<string> {
    const trimmedText = note.trim();

    if (!trimmedText) {
        throw new Error("Note is empty");
    }

    const prompt = buildPrompt(trimmedText, mode);
    return await callGemini(prompt);
}