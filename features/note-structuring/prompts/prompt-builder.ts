import { Mode } from "@/features/note-structuring/shared/types";
import { soapPrompt } from "./soap-prompt";
import { isbarPrompt } from "./isbar-prompt";
import { clinicalSummaryPrompt } from "./clinical-summary-prompt";

export function buildUserPrompt(text: string, mode: Mode): string {
    switch (mode) {
        case "SOAP":
            return soapPrompt(text);

        case "ISBAR":
            return isbarPrompt(text);

        case "Clinical Summary":
            return clinicalSummaryPrompt(text);

        default: {
            const _exhaustive: never = mode;
            throw new Error(`Unhandled mode: ${_exhaustive}`);
        }
    }
}


