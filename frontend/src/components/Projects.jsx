import React, { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { projects } from "../data/mock";
import { Link } from "react-router-dom";
import { spaceUrl } from "../lib/spaces";
import { trackProjectClick } from "../lib/gtm";

export default function Projects() {
  const [category, setCategory] = useState("All disciplines");
  const [expanded, setExpanded] = useState(false);
  const all = category === "All disciplines";
  const filtered = all ? projects : projects.filter(p => category === "Résumé projects" ? p.resumeProject : p.category === category);
  const visible = all && !expanded ? filtered.slice(0, 3) : filtered;

  return (
    <section id="case-studies" className="folio-wrap folio-work">
      <ScrollReveal className="folio-section-head">
        <h2>Selected work</h2>
        <label className="folio-filter">
          <select aria-label="Filter projects" value={category} onChange={e => setCategory(e.target.value)}>
            {["All disciplines", "Résumé projects", ...new Set(projects.map(p => p.category))].map(value => <option key={value}>{value}</option>)}
          </select><ChevronDown aria-hidden="true" size={14} />
        </label>
      </ScrollReveal>
      <ul className="project-list">
        {visible.map(project => (
          <ScrollReveal as="li" key={project.slug}>
            <Link className="project-row" to={spaceUrl(project.slug)}
              onClick={() => trackProjectClick(project.title, "case_study_screen", spaceUrl(project.slug))}>
              <span className="project-name">{project.title.split(" – ")[0]}</span>
              <span className="project-domain">{project.category}</span>
              <span className="project-open"><ArrowUpRight size={20} /></span>
            </Link>
          </ScrollReveal>
        ))}
      </ul>
      {all && filtered.length > 3 && <button className="folio-link archive-toggle" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>
        {expanded ? "Show selected work" : `View all ${projects.length} projects`} <ChevronDown size={14} style={{ transform: expanded ? "rotate(180deg)" : undefined }} />
      </button>}
    </section>
  );
}
