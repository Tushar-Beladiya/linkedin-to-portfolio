import { FormEvent, useEffect, useState } from "react";
import { PortfolioRenderer } from "./components/PortfolioRenderer";
import { fetchVersions, generateFromLinkedin } from "./services/api";
import { GeneratedPortfolioVersion } from "./types";
import "./styles.css";

export default function App() {
  const [linkedinUrl, setLinkedinUrl] = useState("https://www.linkedin.com/in/jane-doe");
  const [tone, setTone] = useState<"minimal" | "bold" | "editorial">("minimal");
  const [refineCopy, setRefineCopy] = useState(true);
  const [versions, setVersions] = useState<GeneratedPortfolioVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<GeneratedPortfolioVersion>();

  useEffect(() => {
    fetchVersions().then(setVersions).catch(() => undefined);
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const version = await generateFromLinkedin(linkedinUrl, tone, refineCopy);
    setSelectedVersion(version);
    setVersions((prev) => [version, ...prev]);
  }

  return (
    <main className="app">
      <section className="controls card">
        <h1>LinkedIn → Personalized Portfolio SaaS</h1>
        <form onSubmit={onSubmit}>
          <label>
            LinkedIn URL
            <input value={linkedinUrl} onChange={(event) => setLinkedinUrl(event.target.value)} required />
          </label>

          <label>
            Theme intensity
            <select value={tone} onChange={(event) => setTone(event.target.value as "minimal" | "bold" | "editorial")}>
              <option value="minimal">Minimal</option>
              <option value="bold">Bold</option>
              <option value="editorial">Editorial</option>
            </select>
          </label>

          <label className="checkbox">
            <input type="checkbox" checked={refineCopy} onChange={(event) => setRefineCopy(event.target.checked)} />
            AI-refine copy
          </label>

          <button type="submit">Generate portfolio</button>
        </form>

        {versions.length > 0 && (
          <>
            <h2>Version history</h2>
            <ul>
              {versions.map((version) => (
                <li key={version.id}>
                  <button onClick={() => setSelectedVersion(version)}>
                    {new Date(version.createdAt).toLocaleString()} · {version.layoutConfig.visualStrategy}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {selectedVersion && <PortfolioRenderer version={selectedVersion} useRefined={refineCopy} />}
    </main>
  );
}
