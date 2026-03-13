import { NextResponse } from "next/server";
import { MODES, StructureRequest } from "@/app/types/structure";
import { structureNote } from "@/app/lib/structureNote";

export async function POST(req: Request) {
  try {
    const json = await req.json();

    // check if the inputs are valid
    if (
      typeof json.note !== "string" ||
      typeof json.mode !== "string" ||
      !MODES.includes(json.mode as StructureRequest["mode"])
    ) {
      return NextResponse.json(
        { error: "Invalid input." },
        { status: 400 }
      );
    }

    // if the inputs are valid, update body object
    const body: StructureRequest = {
      note: json.note,
      mode: json.mode as StructureRequest["mode"],
    };

    // call the structureNote function with body and return status
    const output = await structureNote(body.note, body.mode);
    return NextResponse.json(
      { output },
      { status: 200 }
    );
    
  } catch (error) {

    console.error("Structure route error:", error);

    return NextResponse.json(
      { error: "Failed to process request." },
      { status: 500 }
    );
  }
}