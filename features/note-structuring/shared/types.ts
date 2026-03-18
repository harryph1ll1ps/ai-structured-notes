// supported output modes for structured note generation
export const MODES = ["SOAP", "ISBAR", "Clinical Summary"] as const;
export type Mode = (typeof MODES)[number];

// supported UI states for the structured note request
export type Status = "idle" | "loading" | "error";

// request and response shapes for the structured note generation
export interface StructureRequest { // object -> interface
  note: string;
  mode: Mode;
}

export interface StructureResponse {
  output: string;
}

