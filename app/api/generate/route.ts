import { NextResponse } from "next/server";
import { GenerateRequestSchema, GenerateResponse } from "@/app/types/generate";
import { generateStructuredOutput } from "@/app/lib/generateStructuredOutput";



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

    const output = generateStructuredOutput(parsed.note, parsed.mode);

    return NextResponse.json<GenerateResponse>({ output: output });
}
