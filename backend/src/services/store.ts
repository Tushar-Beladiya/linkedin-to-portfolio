import { nanoid } from "nanoid";
import { GeneratedPortfolioVersion } from "../models/profile.js";

const versions = new Map<string, GeneratedPortfolioVersion[]>();

export function saveVersion(userId: string, data: Omit<GeneratedPortfolioVersion, "id" | "createdAt">): GeneratedPortfolioVersion {
  const version: GeneratedPortfolioVersion = {
    ...data,
    id: nanoid(),
    createdAt: new Date().toISOString()
  };

  const current = versions.get(userId) ?? [];
  versions.set(userId, [version, ...current].slice(0, 20));
  return version;
}

export function listVersions(userId: string): GeneratedPortfolioVersion[] {
  return versions.get(userId) ?? [];
}
