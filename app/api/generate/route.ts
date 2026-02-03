import { NextResponse } from "next/server";
import { GenerateRequest, GenerateResponse } from "@/app/types/generate";
const OUTPUT_PREVIEW_LIMIT = 200;


export async function POST(req: Request) {

    const body = (await req.json()) as GenerateRequest;

    const trimmedText = body.note.trim();

    if(!trimmedText) {
        return NextResponse.json<GenerateResponse>({
            output: "Start typing notes to generate structured output...",
        });
    }
    
    const preview = trimmedText.slice(0,OUTPUT_PREVIEW_LIMIT);
    const suffix = trimmedText.length > OUTPUT_PREVIEW_LIMIT ? "..." : "";

    let output: string;

    switch (body.mode) {
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

    return NextResponse.json<GenerateResponse>({ output });
}
