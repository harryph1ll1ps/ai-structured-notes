import { Mode } from "@/features/note-structuring/shared/types";
import { buildUserPrompt } from "@/features/note-structuring/prompts/prompt-builder";
import { callGemini } from "@/features/note-structuring/server/gemini-client";

// pull the prompt and llm functions together into one function that structures the note
export async function structureNote(note: string, mode: Mode): Promise<string> {
    const trimmedText = note.trim();

    if (!trimmedText) {
        throw new Error("Note is empty");
    }

    const prompt = buildUserPrompt(trimmedText, mode);
    return await callGemini(prompt);
}