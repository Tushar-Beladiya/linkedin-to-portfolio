# LinkedIn to Portfolio SaaS (React + TypeScript)

Production-oriented starter for generating personalized portfolio pages from LinkedIn-style input.

## Quick start

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## API design

### `POST /api/portfolio/generate-from-url`
Request:
```json
{
  "linkedinUrl": "https://www.linkedin.com/in/example",
  "tone": "minimal",
  "refineCopy": true
}
```

### `POST /api/portfolio/generate-from-manual`
Accepts normalized LinkedIn JSON payload.

### `GET /api/portfolio/versions`
Returns generated version history.

## Data models
Core models are in `backend/src/models/profile.ts`:
- `RawLinkedInProfile`
- `ProcessedProfile` with `ProfileIntelligence`
- `LayoutConfig`
- `GeneratedPortfolioVersion`

## Notes
- Ingestion adapters are pluggable and compliance-first.
- Layout generation is rule-driven and dynamic from profile intelligence.
- This repo currently uses in-memory persistence for demonstration.
