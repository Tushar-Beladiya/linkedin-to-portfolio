import { ProcessedProfile, ProfileIntelligence, RawLinkedInProfile } from "../models/profile.js";

const roleSignals: Record<ProfileIntelligence["roleType"], string[]> = {
  engineer: ["engineer", "developer", "software", "platform"],
  designer: ["designer", "ux", "ui", "product design"],
  marketer: ["marketing", "growth", "brand", "content"],
  founder: ["founder", "co-founder", "ceo"],
  sales: ["sales", "account", "revenue"],
  generalist: []
};

export function buildIntelligence(raw: RawLinkedInProfile): ProcessedProfile {
  const headline = `${raw.headline ?? ""} ${(raw.experience[0]?.role ?? "")}`.toLowerCase();

  const roleType = (Object.entries(roleSignals).find(([key, words]) =>
    key !== "generalist" && words.some((w) => headline.includes(w)))?.[0] ?? "generalist") as ProfileIntelligence["roleType"];

  const years = raw.experience.length;
  const seniority: ProfileIntelligence["seniority"] =
    headline.includes("founder") || headline.includes("ceo") ? "founder" :
    headline.includes("chief") || headline.includes("vp") ? "executive" :
    years >= 6 ? "senior" :
    years >= 3 ? "mid" :
    years >= 1 ? "junior" : "student";

  const narrative: ProfileIntelligence["narrative"] =
    roleType === "founder" || seniority === "executive" ? "leader" :
    raw.projects.length >= 2 ? "builder" :
    raw.skills.length > 8 ? "specialist" : "generalist";

  const weightedSections: Record<string, number> = {
    about: raw.about ? 80 : 20,
    experience: raw.experience.length * 18,
    projects: raw.projects.length * (roleType === "engineer" ? 20 : 14),
    skills: raw.skills.length * 6,
    education: raw.education.length * (seniority === "student" ? 20 : 8),
    certifications: raw.certifications.length * 8,
    publications: raw.publications.length * 10
  };

  return {
    ...raw,
    intelligence: { seniority, roleType, narrative, weightedSections }
  };
}
