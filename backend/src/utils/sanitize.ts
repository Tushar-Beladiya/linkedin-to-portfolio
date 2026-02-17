export function sanitizeText(input: string | undefined): string | undefined {
  if (!input) return input;
  return input.replace(/[<>]/g, "").trim();
}
