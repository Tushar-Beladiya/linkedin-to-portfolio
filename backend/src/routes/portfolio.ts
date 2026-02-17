import { Router } from "express";
import { generateFromUrlSchema, rawProfileSchema } from "../models/schemas.js";
import { ingestProfile } from "../services/ingestion.js";
import { buildIntelligence } from "../services/intelligence.js";
import { generateLayout } from "../services/layout.js";
import { refineCopy } from "../services/refinement.js";
import { listVersions, saveVersion } from "../services/store.js";
import { sanitizeText } from "../utils/sanitize.js";

export const portfolioRouter = Router();

portfolioRouter.post("/generate-from-url", async (req, res) => {
  const parsed = generateFromUrlSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.flatten());
    return;
  }

  const raw = await ingestProfile({ linkedinUrl: parsed.data.linkedinUrl });
  raw.about = sanitizeText(raw.about);
  raw.headline = sanitizeText(raw.headline);

  let processed = buildIntelligence(raw);
  if (parsed.data.refineCopy) {
    processed = refineCopy(processed);
  }

  const layoutConfig = generateLayout(processed, parsed.data.tone);
  const version = saveVersion("demo-user", { rawProfile: raw, processedProfile: processed, layoutConfig });
  res.json(version);
});

portfolioRouter.post("/generate-from-manual", (req, res) => {
  const parsed = rawProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error.flatten());
    return;
  }

  let processed = buildIntelligence(parsed.data);
  processed = refineCopy(processed);
  const layoutConfig = generateLayout(processed, "editorial");
  const version = saveVersion("demo-user", { rawProfile: parsed.data, processedProfile: processed, layoutConfig });

  res.json(version);
});

portfolioRouter.get("/versions", (_req, res) => {
  res.json(listVersions("demo-user"));
});
