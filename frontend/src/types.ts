export interface GeneratedPortfolioVersion {
  id: string;
  createdAt: string;
  layoutConfig: {
    sectionOrder: string[];
    visualStrategy: string;
    typographyScale: string;
    spacing: string;
    density: string;
    theme: { palette: string; tone: "minimal" | "bold" | "editorial" };
  };
  processedProfile: {
    fullName: string;
    headline?: string;
    about?: string;
    experience: Array<{ role: string; company: string; description?: string }>;
    projects: Array<{ name: string; description?: string }>;
    skills: string[];
    education: Array<{ school: string; degree?: string }>;
    certifications: string[];
    intelligence: {
      seniority: string;
      roleType: string;
      narrative: string;
    };
    refinedContent?: {
      about?: string;
      experience: Array<{ role: string; company: string; summary: string }>;
    };
  };
}
