export function isbarPrompt(text: string): string {
    return `
    Convert the following raw medical note into a structured ISBAR handover.

    Format:
    Introduction
    - ...

    Situation
    - ...

    Background
    - ...

    Assessment
    - ...

    Recommendation
    - ...

    Rules:
    - Use exactly the section titles above.
    - Use bullet points under each section.
    - Do not include any extra headings or commentary.
    - Do not invent or assume facts not clearly supported by the source text.
    - If a section has no relevant information, write "Not provided".
    - Interpret shorthand only where the meaning is clear and medically standard.
    - Keep the wording concise, professional, and suitable for clinician handover.

    Section guidance:
    - Introduction: identify the patient and relevant immediate context, if provided.
    - Situation: the current issue, reason for review, or immediate concern.
    - Background: relevant history, recent events, diagnoses, medications, or context.
    - Assessment: current clinical findings, observations, investigations, and clinician impression.
    - Recommendation: requested action, escalation, monitoring, treatment, follow-up, or next steps.

    Raw medical note:
    """
    ${text}
    """
    `.trim();
}
