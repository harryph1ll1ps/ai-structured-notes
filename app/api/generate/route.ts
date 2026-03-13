import { NextResponse } from "next/server";
import { GenerateRequestSchema } from "@/app/types/structure";
import { generateStructuredOutput } from "@/app/lib/generateStructuredOutput";

export async function POST(req: Request) {
    let parsed;

    try {
        const body = await req.json();
        parsed = GenerateRequestSchema.parse(body);
    } catch {
        return NextResponse.json(
            { error: "Invalid input." },
            { status: 400 }
        );
    }

    try {
        const output = await generateStructuredOutput(parsed.note, parsed.mode);

        return NextResponse.json(
            { output },
            { status: 200 }
        );
    } catch (error) {
        console.error("Generate route error:", error);

        return NextResponse.json(
            { error: "Failed to generate output." },
            { status: 500 }
        );
    }
}