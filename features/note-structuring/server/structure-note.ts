import { Mode } from "@/features/note-structuring/shared/types";
import { buildPrompt } from "@/features/note-structuring/server/prompt-builder";
import { callGemini } from "@/features/note-structuring/server/gemini-client";


export async function structureNote(note: string, mode: Mode): Promise<string> {
    const trimmedText = note.trim();

    if (!trimmedText) {
        throw new Error("Note is empty");
    }

    const prompt = buildPrompt(trimmedText, mode);
    return await callGemini(prompt);
}