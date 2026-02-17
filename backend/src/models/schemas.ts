import { z } from "zod";

export const rawProfileSchema = z.object({
  source: z.enum(["linkedin-url", "manual-json", "manual-text", "pdf-upload"]),
  profileUrl: z.string().url().optional(),
  fullName: z.string().min(1),
  headline: z.string().optional(),
  about: z.string().optional(),
  profilePhotoUrl: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),
  location: z.string().optional(),
  industry: z.string().optional(),
  experience: z.array(z.object({
    role: z.string(),
    company: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string().optional()
  })).default([]),
  education: z.array(z.object({
    school: z.string(),
    degree: z.string().optional(),
    fieldOfStudy: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional()
  })).default([]),
  skills: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    link: z.string().url().optional()
  })).default([]),
  publications: z.array(z.object({
    title: z.string(),
    publisher: z.string().optional(),
    link: z.string().url().optional()
  })).default([]),
  featuredLinks: z.array(z.object({
    label: z.string(),
    url: z.string().url()
  })).default([])
});

export const generateFromUrlSchema = z.object({
  linkedinUrl: z.string().url(),
  tone: z.enum(["minimal", "bold", "editorial"]).default("minimal"),
  refineCopy: z.boolean().default(false)
});

export const updatePortfolioSchema = z.object({
  sectionOrder: z.array(z.string()).optional(),
  hiddenSections: z.array(z.string()).optional(),
  tone: z.enum(["minimal", "bold", "editorial"]).optional()
});
