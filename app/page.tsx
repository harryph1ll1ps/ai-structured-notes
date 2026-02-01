"use client";  // tells next.js this file should run on the client (in the browser), not on the server.

import { useState, useMemo } from "react";

type Mode = "summary" | "actions" | "questions";

const MODES = ["summary", "actions", "questions"] as const; // as const makes it a list of literals, rather than simply strings



export default function HomePage() {
  const [note, setNote] = useState<string>(""); // sets state as note === "", with setNote as a function for updating the value
  const [mode, setMode] = useState<Mode>("summary");

  
  const output = useMemo(() => { 
    if (!note.trim()) return "Insert notes to see structured output here.";

    const preview = note.trim().slice(0,220);
    const suffix = note.trim().length > 220 ? "..." : "";

    switch (mode) {
      case "summary":
        return `Summary:\n- ${preview}${suffix}`;
      case "actions":
        return `Action items:\n- ${preview}${suffix}`;
      case "questions":
        return `Follow-up questions\n- What did you mean by "${preview.slice(0,40)}..."?`;
      default: {
        const _exhaustive: never = mode;
        return _exhaustive
      }
    }
  }, [note, mode]); // tells react only recompute if node or mode changes (useMemo)

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
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Raw notes</label>
              <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Patient reports headaches for 2 weeks..."
              className="h-64 w-full resize-none rounded-xl border border-neutral-200 bg-white p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-200 text-neutral-900"
              /> 
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Mode</div>
              <div className="flex flex-wrap gap-2">
                {MODES.map((m) => {
                  const isActive = (m === mode);

                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      className={[
                        "rounded-full px-3 py-1.5 text-sm transition",
                        "border shadow-sm",
                        isActive
                          ? "border-neutral-800 bg-neutral-800 text-white"
                          : "border-neutral-200 bg-neutral-200 text-neutral-800 hover:bg-neutral-50",
                      ].join(" ")}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

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
