import { Mode, OpenRouterResponse } from "@/app/types/generate";


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
            return _exhaustive;
        }
    } 
}

export async function callOpenRouter(prompt: string): Promise<string> {
    
    const key = process.env.OPENROUTER_API_KEY;

    if (!key) {
        throw new Error("API key not found");
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${key}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "openai/gpt-oss-20b:free",
            "messages": [
                {
                    "role": "user",
                    "content": `${prompt}`
                }
            ]
        })
    });
    
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`OpenRouter error ${res.status}: ${text}`);
    }

    let data: OpenRouterResponse;

    try {
        data = (await res.json()) as OpenRouterResponse;
    } catch {
        throw new Error("Invalid JSON response from OpenRouter");
    }

    return data.choices?.[0]?.message?.content ?? "";
}


export async function generateStructuredOutput(note: string, mode: Mode): Promise<string> {
    const trimmedText = note.trim();

    if(!trimmedText) {
        return "Start typing notes to generate structured output...";
    }

    const prompt = buildPrompt(trimmedText, mode);
    const outputText = await callOpenRouter(prompt)

    return outputText


}
