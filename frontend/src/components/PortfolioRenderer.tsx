import { GeneratedPortfolioVersion } from "../types";

type Props = {
  version: GeneratedPortfolioVersion;
  useRefined: boolean;
};

const toneClassMap = {
  minimal: "theme-minimal",
  bold: "theme-bold",
  editorial: "theme-editorial"
};

export function PortfolioRenderer({ version, useRefined }: Props) {
  const profile = version.processedProfile;
  const about = useRefined ? profile.refinedContent?.about ?? profile.about : profile.about;

  return (
    <article className={`portfolio ${toneClassMap[version.layoutConfig.theme.tone]}`}>
      <header className="hero">
        <p className="chip">{profile.intelligence.roleType} • {profile.intelligence.seniority}</p>
        <h1>{profile.fullName}</h1>
        <p>{profile.headline}</p>
      </header>

      {version.layoutConfig.sectionOrder.includes("about") && about && (
        <section>
          <h2>About</h2>
          <p>{about}</p>
        </section>
      )}

      {version.layoutConfig.sectionOrder.includes("experience") && profile.experience.length > 0 && (
        <section>
          <h2>Experience</h2>
          <div className="grid">
            {(useRefined ? profile.refinedContent?.experience : profile.experience)?.map((exp) => (
              <div className="card" key={`${exp.role}-${exp.company}`}>
                <h3>{exp.role}</h3>
                <p>{exp.company}</p>
                <p>{"summary" in exp ? exp.summary : exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {version.layoutConfig.sectionOrder.includes("projects") && profile.projects.length > 0 && (
        <section>
          <h2>Projects</h2>
          <div className="grid">
            {profile.projects.map((project) => (
              <div className="card" key={project.name}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {version.layoutConfig.sectionOrder.includes("skills") && profile.skills.length > 0 && (
        <section>
          <h2>Skills</h2>
          <p>{profile.skills.join(" • ")}</p>
        </section>
      )}
    </article>
  );
}
