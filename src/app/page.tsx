"use client";  // run on the client (in the browser), not on the server
import { useState } from "react";
import clsx from "clsx";
import { MODES, StructureResponse, StructureRequest, Mode, Status } from "../../features/note-structuring/shared/types";


export default function HomePage() {

  // set state variables
  const [rawNote, setRawNote] = useState<string>(""); 
  const [currentMode, setMode] = useState<Mode>("summary");
  const [structuredNote, setStructuredNote] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");


  async function structuredNoteOutput() {
    console.log("hello;");

    // send POST request to get structured note response
    setStatus("loading");

    try{

      // send note and mode to the server
      const payload: StructureRequest = {
        note: rawNote,
        mode: currentMode,
      };

      const res = await fetch("/api/structure", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // "the body im sending is JSON"
        body: JSON.stringify(payload),
      });

      // if the server fails to respond correctly, throw an error to be caught
      if(!res.ok) {
        throw new Error("Failed to generate structured output");
      }

      // if successful, update the structured note variable
      const data = (await res.json()) as StructureResponse;
      console.log(`SUCCESS: ${data}`) // FOR TESTING - DELETE THIS LINE
      setStructuredNote(data.output);
      setStatus("idle");

    } catch {
      // in the case of an error, update the structured note variable with an error message
      setStructuredNote("Something went wrong. Please try again.");
      setStatus("error");
    }
  }
  





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
                {MODES.map((m) => { // for each mode create a button - varies depending on whether the button is active
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
                    )} // join the ClassName together using clsx
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

          <button
            type = "button"
            disabled={status === "loading"}
            onClick={() => structuredNoteOutput()}
            className={clsx(
              "rounded-xl px-4 py-2 text-sm font-medium shadow-sm",
              status === "loading"
                ? "bg-neutral-400 text-white"
                : "bg-neutral-900 text-white hover:bg-neutral-800"
          )}
          >
            {status === "loading" ? "Generating..." : "Generate"}
          </button>

          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Output</div>
            <div className="h-64 overflow-auto rounded-xl border border-neutral-200 bg-white p-3 text-sm shadow-sm whitespace-pre-wrap text-neutral-900">
                {structuredNote}
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
