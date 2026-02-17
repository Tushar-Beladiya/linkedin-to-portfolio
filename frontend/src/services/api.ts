import { GeneratedPortfolioVersion } from "../types";

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

export async function generateFromLinkedin(linkedinUrl: string, tone: "minimal" | "bold" | "editorial", refineCopy: boolean): Promise<GeneratedPortfolioVersion> {
  const response = await fetch(`${baseUrl}/portfolio/generate-from-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ linkedinUrl, tone, refineCopy })
  });

  if (!response.ok) {
    throw new Error("Failed to generate portfolio.");
  }

  return response.json();
}

export async function fetchVersions(): Promise<GeneratedPortfolioVersion[]> {
  const response = await fetch(`${baseUrl}/portfolio/versions`);
  if (!response.ok) throw new Error("Failed to load versions");
  return response.json();
}
