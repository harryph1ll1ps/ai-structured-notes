import { Mode } from "@/app/types/generate";

const OUTPUT_PREVIEW_LIMIT = 200;

export function generateStructuredOutput(note: string, mode: Mode): string {
    const trimmedText = note.trim();

    if(!trimmedText) {
        return "Start typing notes to generate structured output...";
    }
    
    const preview = trimmedText.slice(0,OUTPUT_PREVIEW_LIMIT);
    const suffix = trimmedText.length > OUTPUT_PREVIEW_LIMIT ? "..." : "";

    let output: string;

    switch (mode) {
        case "summary":
            return `Summary:\n- ${preview}${suffix}`;
            
        case "actions":
            return `Action items:\n- ${preview}${suffix}`;
            
        case "questions":
            return `Follow-up questions:\n- What did you mean by "${preview.slice(0,40)}..."?`;
            
        default: {
            const _exhaustive: never = mode;
            return _exhaustive;
        }
    }  
}
