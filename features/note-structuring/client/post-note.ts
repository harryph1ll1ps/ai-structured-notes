import { StructureRequest, StructureResponse, Mode } from "@/features/note-structuring/shared/types"
  
export async function postNote(note: string, mode: Mode): Promise<string> {
    
    // send note and mode to the server
    const payload: StructureRequest = {note, mode};
    const res = await fetch("/api/structure", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // "the body im sending is JSON"
        body: JSON.stringify(payload),
    });

    // if the server fails to respond correctly, throw an error to be caught
    if(!res.ok) {
        throw new Error("Failed to generate structured output");
    }

    // if successful, return the structured text
    const data = (await res.json()) as StructureResponse;
    return data.output;
}