/**
 * Zod schemas for validating external input to the generate API.
 */

import { z } from "zod";
import { MODES } from "./types";

export const GenerateRequestSchema = z.object({
  note: z.string(),
  mode: z.enum(MODES),
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;