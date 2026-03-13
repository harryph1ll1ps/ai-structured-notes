/**
 * Core TypeScript types used by the generate structured output feature.
 * Defines the internal shapes of requests and responses.
 */

export const MODES = ["summary", "actions", "questions"] as const;

export type Mode = (typeof MODES)[number];

export interface OpenRouterResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

export interface GenerateResponse {
  output: string;
}