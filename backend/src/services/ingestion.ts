import { RawLinkedInProfile } from "../models/profile.js";

export interface IngestionAdapter {
  canHandle(input: { linkedinUrl?: string; payload?: unknown }): boolean;
  ingest(input: { linkedinUrl?: string; payload?: unknown }): Promise<RawLinkedInProfile>;
}

/**
 * Compliance-first adapter. In production this should call approved third-party enrichment APIs,
 * LinkedIn-authorized exports, or user-provided data. Direct scraping should only run when
 * legal/commercial review is complete.
 */
class LinkedInUrlAdapter implements IngestionAdapter {
  canHandle(input: { linkedinUrl?: string }): boolean {
    return Boolean(input.linkedinUrl);
  }

  async ingest(input: { linkedinUrl?: string }): Promise<RawLinkedInProfile> {
    const profileSlug = input.linkedinUrl?.split("/").filter(Boolean).pop() ?? "profile";

    // Placeholder deterministic fallback to keep the demo runnable without violating ToS.
    return {
      source: "linkedin-url",
      profileUrl: input.linkedinUrl,
      fullName: profileSlug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      headline: "Technology leader building scalable digital products",
      about: "I ship products from zero to scale, balancing engineering quality with customer impact.",
      location: "Remote",
      industry: "Software",
      experience: [
        {
          role: "Senior Product Engineer",
          company: "Growth Labs",
          startDate: "2021",
          endDate: "Present",
          description: "Led platform modernization and increased conversion by 27%."
        }
      ],
      education: [{ school: "State University", degree: "BSc", fieldOfStudy: "Computer Science" }],
      skills: ["React", "TypeScript", "Node.js", "System Design"],
      certifications: ["AWS Solutions Architect"],
      projects: [{ name: "Revenue Insights", description: "Analytics suite for SaaS teams" }],
      publications: [],
      featuredLinks: []
    };
  }
}

class ManualPayloadAdapter implements IngestionAdapter {
  canHandle(input: { payload?: unknown }): boolean {
    return Boolean(input.payload);
  }

  async ingest(input: { payload?: unknown }): Promise<RawLinkedInProfile> {
    return input.payload as RawLinkedInProfile;
  }
}

const adapters: IngestionAdapter[] = [new ManualPayloadAdapter(), new LinkedInUrlAdapter()];

export async function ingestProfile(input: { linkedinUrl?: string; payload?: unknown }): Promise<RawLinkedInProfile> {
  const adapter = adapters.find((candidate) => candidate.canHandle(input));
  if (!adapter) {
    throw new Error("No ingestion strategy available for the provided input.");
  }
  return adapter.ingest(input);
}
