// supported output modes for structured note generation
export const MODES = ["summary", "actions", "questions"] as const;
export type Mode = (typeof MODES)[number];


// request and response shapes for the structured note generation
export interface GenerateRequest {
  note: string;
  mode: Mode;
}

export interface GenerateResponse {
  output: string;
}

