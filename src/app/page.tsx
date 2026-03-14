"use client";  // run on the client (in the browser), not on the server
import { useState } from "react";
import clsx from "clsx";
import { MODES, Mode, Status } from "../../features/note-structuring/shared/types";
import { structureNote } from "@/features/note-structuring/client/structured-note-client";

export default function HomePage() {

  // set state variables
  const [rawNote, setRawNote] = useState<string>(""); 
  const [currentMode, setMode] = useState<Mode>("summary");
  const [structuredNote, setStructuredNote] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [hasGenerated, setHasGenerated] = useState(false)

  // a function for structuring the note
  async function handleNoteStructuring() {
    setStatus("loading");
    try {
      const output = await structureNote(rawNote, currentMode);
      setStructuredNote(output);
      setHasGenerated(true);
      setStatus("idle");
    } catch {
      setStructuredNote("Something went wrong. Please try again.");
      setHasGenerated(true)
      setStatus("error");
    }
  }




  function handleTextChange(value: string) {
    if (hasGenerated) {
      setStructuredNote(value);
    } else {
      setRawNote(value);
    }
  }

  const displayedText =
    status === "loading"
      ? "Generating..."
      : hasGenerated
      ? structuredNote
      : rawNote;

      

      
  return (
    <main className="min-h-screen bg-neutral-200 text-black flex items-center justify-center px-6 py-6">
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
        <textarea
          value={displayedText}
          onChange={(e) => handleTextChange(e.target.value)}
          disabled={status === "loading"}
          placeholder="Type or paste notes here..."
          className="
            w-full h-[60vh]
            resize-none
            bg-white
            px-12 py-12
            text-[15px] leading-7
            shadow-lg
            outline-none
            disabled:text-neutral-500
          "
        />

        {/* Controls */}
        <div className="mt-4">
          <label className="text-sm text-neutral-900">Format</label>

          <select
            value={currentMode}
            onChange={(e) => setMode(e.target.value as Mode)}
            disabled={status === "loading"}
            className="
              mt-1 w-full
              rounded-md
              border border-neutral-300
              bg-white
              px-3 py-2
              text-sm
              outline-none
              focus:border-neutral-400
            "
          >
            {MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>

          <button
            onClick={handleNoteStructuring}
            disabled={status === "loading" || !rawNote.trim()}
            className="
              mt-3 w-full
              rounded-md
              bg-neutral-900
              px-4 py-3
              text-sm font-medium text-white
              hover:bg-neutral-800
              disabled:bg-neutral-400
            "
          >
            {status === "loading" ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </main>
  );
}
