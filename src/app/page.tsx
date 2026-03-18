"use client";  // run on the client (in the browser), not on the server
import { useState } from "react";
import { Mode, Status } from "../../features/note-structuring/shared/types";
import { postNote } from "@/features/note-structuring/client/post-note";
import NoteControls from "@/features/note-structuring/components/note-controls";
import NoteEditor from "@/features/note-structuring/components/note-editor";

export default function HomePage() {

  // set state variables
  const [note, setNote] = useState<string>(""); 
  const [currentMode, setCurrentMode] = useState<Mode>("SOAP");
  const [status, setStatus] = useState<Status>("idle");

  // a function for structuring the note
  async function handleGenerate() {
    setStatus("loading");
    try {
      const output = await postNote(note, currentMode);
      setNote(output);
      setStatus("idle");
    } catch {
      setNote("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  // handle the UI text that gets displayed 
  const displayedText = status === "loading" ? "Generating..." : note;


  // render the webpage
  return (
    <main className="min-h-screen bg-neutral-100 text-black flex items-center justify-center px-6 py-6">
      <div className="w-full max-w-[760px]">

        {/* Title */}
        <header className="mb-5 text-center">
          <h1 className="text-lg font-semibold tracking-wide">
            Structure Notes
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Turn raw notes into a cleaner format
          </p>
        </header>

        {/* Paper */}
        <NoteEditor
          value={displayedText}
          onEdit={setNote}
          disabled={status === "loading"}
        />

        {/* Controls */}
        <NoteControls
          currentMode={currentMode}
          onModeChange={setCurrentMode}
          onGenerate={handleGenerate}
          status={status}
          canGenerate={!!note.trim()}
        />
      </div>
    </main>
  );
}
