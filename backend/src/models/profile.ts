export type IngestionSource = "linkedin-url" | "manual-json" | "manual-text" | "pdf-upload";

export interface RawLinkedInProfile {
  source: IngestionSource;
  profileUrl?: string;
  fullName: string;
  headline?: string;
  about?: string;
  profilePhotoUrl?: string;
  bannerUrl?: string;
  location?: string;
  industry?: string;
  experience: Array<{
    role: string;
    company: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }>;
  education: Array<{
    school: string;
    degree?: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
  }>;
  skills: string[];
  certifications: string[];
  projects: Array<{
    name: string;
    description?: string;
    link?: string;
  }>;
  publications: Array<{
    title: string;
    publisher?: string;
    link?: string;
  }>;
  featuredLinks: Array<{ label: string; url: string }>;
}

export interface ProfileIntelligence {
  seniority: "student" | "junior" | "mid" | "senior" | "founder" | "executive";
  roleType: "engineer" | "designer" | "marketer" | "founder" | "sales" | "generalist";
  narrative: "builder" | "leader" | "specialist" | "generalist";
  weightedSections: Record<string, number>;
}

export interface LayoutConfig {
  sectionOrder: string[];
  visualStrategy: "hero-first" | "timeline-first" | "project-first" | "writing-first";
  typographyScale: "compact" | "balanced" | "dramatic";
  spacing: "tight" | "regular" | "airy";
  density: "dense" | "comfortable";
  theme: {
    palette: string;
    tone: "minimal" | "bold" | "editorial";
  };
}

export interface GeneratedPortfolioVersion {
  id: string;
  createdAt: string;
  rawProfile: RawLinkedInProfile;
  processedProfile: ProcessedProfile;
  layoutConfig: LayoutConfig;
}

export interface ProcessedProfile extends RawLinkedInProfile {
  intelligence: ProfileIntelligence;
  refinedContent?: {
    about?: string;
    experience: Array<{ role: string; company: string; summary: string }>;
  };
}
