import React, { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useStaticMotion } from "../hooks/useStaticMotion";
import { projects } from "../data/mock";
import { Link } from "react-router-dom";
import { spaceUrl } from "../lib/spaces";
import { trackProjectClick } from "../lib/gtm";

export default function Projects() {
  const [category, setCategory] = useState("All disciplines");
  const [expanded, setExpanded] = useState(false);
  const staticMotion = useStaticMotion();
  const Row = staticMotion ? "li" : motion.li;
  const reveal = staticMotion ? {} : {
    initial: { opacity: 0, y: 8 }, whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }, transition: { duration: .32 }
  };
  const all = category === "All disciplines";
  const filtered = all ? projects : projects.filter(p => category === "Résumé projects" ? p.resumeProject : p.category === category);
  const visible = all && !expanded ? filtered.slice(0, 3) : filtered;

  return (
    <section id="case-studies" className="folio-wrap folio-work">
      <div className="folio-section-head">
        <h2>Selected work</h2>
        <label className="folio-filter">
          <select aria-label="Filter projects" value={category} onChange={e => setCategory(e.target.value)}>
            {["All disciplines", "Résumé projects", ...new Set(projects.map(p => p.category))].map(value => <option key={value}>{value}</option>)}
          </select><ChevronDown aria-hidden="true" size={14} />
        </label>
      </div>
      <ul className="project-list">
        {visible.map(project => (
          <Row key={project.slug} {...reveal}>
            <Link className="project-row" to={spaceUrl(project.slug)}
              onClick={() => trackProjectClick(project.title, "case_study_screen", spaceUrl(project.slug))}>
              <span className="project-name">{project.title.split(" – ")[0]}</span>
              <span className="project-domain">{project.category}</span>
              <span className="project-open"><ArrowUpRight size={20} /></span>
            </Link>
          </Row>
        ))}
      </ul>
      {all && filtered.length > 3 && <button className="folio-link archive-toggle" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>
        {expanded ? "Show selected work" : `View all ${projects.length} projects`} <ChevronDown size={14} style={{ transform: expanded ? "rotate(180deg)" : undefined }} />
      </button>}
    </section>
  );
}
