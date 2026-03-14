import { Mode } from "@/features/note-structuring/shared/types";



export function buildPrompt(note: string, mode: Mode): string {
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