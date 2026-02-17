import { LayoutConfig, ProcessedProfile } from "../models/profile.js";

const rolePalette: Record<string, string> = {
  engineer: "indigo-slate",
  designer: "magenta-graphite",
  marketer: "orange-ink",
  founder: "emerald-obsidian",
  sales: "blue-amber",
  generalist: "neutral-carbon"
};

export function generateLayout(profile: ProcessedProfile, tone: LayoutConfig["theme"]["tone"]): LayoutConfig {
  const sortedSections = Object.entries(profile.intelligence.weightedSections)
    .sort((a, b) => b[1] - a[1])
    .map(([section]) => section);

  const visualStrategy: LayoutConfig["visualStrategy"] =
    sortedSections[0] === "projects" ? "project-first" :
    sortedSections[0] === "experience" ? "timeline-first" :
    sortedSections[0] === "about" ? "hero-first" : "writing-first";

  const typographyScale: LayoutConfig["typographyScale"] =
    profile.intelligence.seniority === "executive" ? "dramatic" :
    profile.intelligence.seniority === "student" ? "compact" : "balanced";

  return {
    sectionOrder: ["hero", ...sortedSections, "featuredLinks"],
    visualStrategy,
    typographyScale,
    spacing: tone === "editorial" ? "airy" : "regular",
    density: tone === "minimal" ? "comfortable" : "dense",
    theme: {
      palette: rolePalette[profile.intelligence.roleType],
      tone
    }
  };
}
