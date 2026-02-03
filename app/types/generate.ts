export type Mode = "summary" | "actions" | "questions";

export interface GenerateRequest {
    note: string;
    mode: Mode;
}

export interface GenerateResponse {
    output: string;
}