export function clinicalSummaryPrompt(text: string): string {
    return `
    Convert the following raw medical note into a clear and concise clinical summary.

    Format:
    Clinical Summary
    - ...

    Rules:
    - Use exactly the heading "Clinical Summary".
    - Use bullet points only.
    - Do not include any extra headings or commentary.
    - Do not invent or assume facts not clearly supported by the source text.
    - Interpret shorthand only where the meaning is clear and medically standard.
    - Remove repetition, filler, and disorganised phrasing.
    - Prioritise the most clinically relevant information.
    - Present the information in a logical order suitable for medical documentation.

    Content guidance:
    - Summarise the presenting issue or reason for care, if provided.
    - Include relevant symptoms, history, examination findings, investigations, and clinical impression if present.
    - Include management, treatment, follow-up, or other key next steps if present.
    - Exclude trivial detail unless it is clinically relevant.
    - If the note is very limited, stay conservative and closely reflect the source wording.

    Raw medical note:
    """
    ${text}
    """
    `.trim();
}
