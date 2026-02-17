# LinkedIn to Portfolio SaaS Architecture

## 1) System architecture (text diagram)

```text
[React + TypeScript SPA Dashboard]
    ├── Generate request (URL/manual payload, tone, refine toggle)
    ├── Edit controls (reorder/hide sections, regenerate)
    └── Version selector
            |
            v
[API Layer: Express TypeScript]
    ├── AuthN/AuthZ (TODO)
    ├── Rate limit + payload validation + sanitization
    ├── Ingestion Orchestrator
    │      ├── LinkedIn URL adapter (compliance-safe integration)
    │      ├── Manual JSON/text adapter
    │      └── Future PDF parser adapter
    ├── Profile Intelligence Service
    ├── Dynamic Layout Engine
    ├── Optional Copy Refinement Service
    └── Versioning Store (currently in-memory; TODO persistent DB)
            |
            v
[Data Layer]
    ├── raw_profile
    ├── processed_profile
    ├── layout_config
    ├── user_edits
    └── versions
```

## 2) Data flow
1. User submits LinkedIn URL or manual profile payload.
2. Ingestion service selects adapter strategy based on input channel.
3. Raw profile is sanitized and normalized.
4. Intelligence layer infers role/seniority/narrative and section weights.
5. Layout engine computes non-template config (order, typography, spacing, visual strategy).
6. Optional copy refinement generates concise text while preserving facts.
7. Result is versioned and returned for rendering.

## 3) Compliance and constraints
- LinkedIn ingestion is adapter-based so direct scraping is not required in core flow.
- Default adapter returns deterministic fallback data for local demo; production should integrate approved providers or user exports.
- Ingestion and rendering are isolated to avoid coupling legal-risk integrations with UI code.
- Sanitization strips basic HTML/script vectors before processing.

## 4) Scalability decisions
- API-first separation allows horizontal scale and independent frontend deployment.
- Services are stateless except version store (replace with Postgres + Redis).
- Rate limiter protects generation endpoints from abuse.
- Feature flags can be added at service boundaries (layout strategies, model providers, theme algorithms).

## 5) UX personalization
- Layout is generated from weighted profile sections, not hard-coded templates.
- Visual strategy changes between hero/timeline/project/writing priority.
- Theme intensity toggle changes density/spacing/typography behavior.

## 6) Security notes
- Input validation with Zod.
- Helmet + CORS defaults.
- Prompt injection mitigation path: sanitize before any AI refinement and only pass whitelisted fields.

## 7) TODOs
- Add JWT auth and tenant isolation.
- Persist versions and user edits in Postgres.
- Signed public page URLs + CDN caching.
- Integrate compliant enrichment vendors and explicit user-consent logging.
- Add SSR layer (Next.js or Express SSR) for public portfolio pages and SEO metadata generation.
- Add background jobs for large document parsing/refinement.
