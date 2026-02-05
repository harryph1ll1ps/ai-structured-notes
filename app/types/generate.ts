import { z } from "zod"; // zod enforces typescript at runtime

export type Mode = "summary" | "actions" | "questions";

// control the user input using zod
export const GenerateRequestSchema = z.object({
    note: z.string(),
    mode: z.enum(["summary", "actions", "questions"]),
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

export interface GenerateResponse {
    output: string;
}