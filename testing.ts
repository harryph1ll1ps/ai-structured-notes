
export async function callOpenRouter(): Promise<string> {
    
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
            "model": "tngtech/deepseek-r1t2-chimera:free",
            "messages": [
                {
                    "role": "user",
                    "content": "what is hello world?"
                }
            ]
        })
    });
    
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`OpenRouter error ${res.status}: ${text}`);
    }

    let data: any;

    try {
        data = (await res.json()) as any;
    } catch {
        throw new Error("Invalid JSON response from OpenRouter");
    }

    return data.choices?.[0]?.message?.content ?? "";
}

(async () => {
    const res = await callOpenRouter();
    console.log(res);
})();