import { NextResponse } from "next/server";
import { GenerateRequest, GenerateRequestSchema, GenerateResponse } from "@/app/types/generate";
const OUTPUT_PREVIEW_LIMIT = 200;


export async function POST(req: Request) {

    let parsed;

    try {
        parsed = GenerateRequestSchema.parse(await req.json());
    } catch {
        return NextResponse.json<GenerateResponse>(
            {output: "Invalid input."},
            {status: 400}
        );
    }

    const trimmedText = parsed.note.trim();

    if(!trimmedText) {
        return NextResponse.json<GenerateResponse>({
            output: "Start typing notes to generate structured output...",
        });
    }
    
    const preview = trimmedText.slice(0,OUTPUT_PREVIEW_LIMIT);
    const suffix = trimmedText.length > OUTPUT_PREVIEW_LIMIT ? "..." : "";

    let output: string;

    switch (parsed.mode) {
        case "summary":
            output = `Summary:\n- ${preview}${suffix}`;
            break;
        case "actions":
            output = `Action items:\n- ${preview}${suffix}`;
            break;
        case "questions":
            output = `Follow-up questions:\n- What did you mean by "${preview.slice(0,40)}..."?`;
            break;
        default: 
            output = "unsupported mode";
    }

    return NextResponse.json<GenerateResponse>({ output: output });
}
