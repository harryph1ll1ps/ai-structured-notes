"use client";  // tells next.js this file should run on the client (in the browser), not on the server.
import { useState, useMemo } from "react";
import clsx from "clsx";


type Mode = "summary" | "actions" | "questions";
const MODES = ["summary", "actions", "questions"] as const; // as const makes it a list of literals, rather than simply strings
const OUTPUT_PREVIEW_LIMIT = 200;


function formatOutput(note: string, mode: Mode): string {
  const trimmedNote = note.trim()
  if (!trimmedNote) return "Start typing notes to generate structured output...";

  const preview = trimmedNote.slice(0, OUTPUT_PREVIEW_LIMIT);
  const suffix = trimmedNote.length > OUTPUT_PREVIEW_LIMIT ? "..." : "";

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


export default function HomePage() {

  // set note and mode state variables
  const [rawNote, setRawNote] = useState<string>(""); // sets state as rawNote === "", with setRawNote as a function for updating the value
  const [currentMode, setMode] = useState<Mode>("summary");

  
  // get the structured note output
  const output = useMemo(() => formatOutput(rawNote, currentMode), [rawNote, currentMode]); // recomputes when 'rawNote' or 'currentMode' changes (useMemo)


  // render the webpage
  return (
    <main className= "min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Structure Your Notes
          </h1>
          <p className="text-sm text-neutral-500">
            Paste messy notes. Get AI powered structure. (prototype)
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">

          {/* Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="note-input" className="text-sm font-medium">Raw notes</label>
              <textarea
              id="note-input"
              value={rawNote}
              onChange={(e) => setRawNote(e.target.value)} // on event e, update the rawNote value to the text inside the <textarea>
              placeholder="e.g. Patient reports headaches for 2 weeks..."
              className="h-64 w-full resize-none rounded-xl border border-neutral-200 bg-white p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-200 text-neutral-900"
              /> 
            </div>

            {/* Mode Selector */}
            <div className="space-y-2">
              <div className="text-sm font-medium">Mode</div>
              <div className="flex flex-wrap gap-2">
                {MODES.map((m) => {
                  const isActive = (m === currentMode);

                  return (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setMode(m)}
                      className={clsx(
                        "rounded-full px-3 py-1.5 text-sm transition",
                        "border shadow-sm",
                        isActive
                          ? "border-white bg-neutral-800 text-white"
                          : "border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50",
                  )}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Output</div>
            <div className="h-64 overflow-auto rounded-xl border border-neutral-200 bg-white p-3 text-sm shadow-sm whitespace-pre-wrap text-neutral-900">
                {output}
            </div>
          
          <p className="text-xs text-neutral-500">
            Next: we'll replace this with a real `/api/generate` call.
          </p>
        </div>
        </section>
      </div>
    </main>
  );
}
