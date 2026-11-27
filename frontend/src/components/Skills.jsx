import React from "react";
import { skills } from "../data/mock";
import SkillLogo from "../assets/SkillLogo";
import ScrollReveal from "./ScrollReveal";

const groups = [
  { title: "Languages", tools: [["python", "Python"], ["java", "Java"], ["javascript", "JavaScript"], ["typescript", "TypeScript"]] },
  { title: "Web & APIs", tools: [["react", "React"], ["nextjs", "Next.js"], ["fastapi", "FastAPI"], ["nodejs", "Node.js"]] },
  { title: "Data & AI", tools: [["pandas", "pandas"], ["numpy", "NumPy"], ["huggingface", "Hugging Face"], ["neo4j", "Neo4j"]] },
  { title: "Databases", tools: [["postgresql", "PostgreSQL"], ["mongodb", "MongoDB"], ["redis", "Redis"], ["supabase", "Supabase"]] },
  { title: "Cloud & tooling", tools: [["googlecloud", "Google Cloud"], ["firebase", "Firebase"], ["git", "Git"], ["postman", "Postman"]] }
];

const skillNames = {
  aiMachineLearning: "Machine learning", aiInfrastructure: "AI infrastructure",
  frameworksApis: "Frameworks and APIs", programming: "Languages",
  cloudDevOps: "Cloud and DevOps", dataAnalytics: "Data analytics", toolsDatabases: "Tools and databases"
};

export default function Skills() {
  return (
    <section id="skills" className="folio-wrap skills-section" aria-labelledby="skills-heading">
      <ScrollReveal className="folio-section-head"><h2 id="skills-heading">Skills & tools</h2></ScrollReveal>
      <div className="skills-grid">
        {groups.map(({ title, tools }) => (
          <ScrollReveal className="skill-group" key={title}>
            <h3>{title}</h3>
            <ul>{tools.map(([id, name]) => (
              <li key={id}>
                <SkillLogo id={id} />
                <span>{name}</span>
              </li>
            ))}</ul>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal as="details" className="skills-index">
        <summary>Full skills list</summary>
        <dl>{Object.entries(skillNames).map(([key, label]) => (
          <div key={key}><dt>{label}</dt><dd>{skills[key].join(", ")}</dd></div>
        ))}</dl>
      </ScrollReveal>
    </section>
  );
}
