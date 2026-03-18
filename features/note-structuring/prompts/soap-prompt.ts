export function soapPrompt(text: string): string {
    return `
    Convert the following raw medical note into a structured SOAP note.

    Format:
    Subjective
    - ...

    Objective
    - ...

    Assessment
    - ...

    Plan
    - ...

    Rules:
    - Use bullet points under each section.
    - Use exactly the section titles above.
    - Do not include any extra text.

    Raw note:
    """
    ${text}
    """
    `.trim();
}
