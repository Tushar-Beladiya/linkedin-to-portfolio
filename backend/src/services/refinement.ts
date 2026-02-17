import { ProcessedProfile } from "../models/profile.js";

/**
 * Safe deterministic refinement fallback. Replace with LLM provider guarded by factuality checks.
 */
export function refineCopy(profile: ProcessedProfile): ProcessedProfile {
  const about = profile.about
    ? profile.about.replace(/\s+/g, " ").replace(/I /g, "I consistently ")
    : undefined;

  const experience = profile.experience.map((item) => ({
    role: item.role,
    company: item.company,
    summary: item.description
      ? item.description.slice(0, 180)
      : `${item.role} at ${item.company}, focused on measurable business outcomes.`
  }));

  return {
    ...profile,
    refinedContent: {
      about,
      experience
    }
  };
}
