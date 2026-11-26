import React from "react";
import { ArrowUpRight } from "lucide-react";
import { experiences, education, achievements, certifications } from "../data/mock";

export default function WorkbenchSection({ onOpenWikiScreen }) {
  return <section id="workbench" className="folio-wrap about-section">
    <h2>About</h2>
    <details><summary>Experience</summary><div>
      {experiences.map(role => <article key={role.id}>
        <h3>{role.title} · {role.company}</h3>
        <p>{role.period} · {role.location}</p>
        <p>{role.impact}</p>
        <ul className="experience-highlights">{role.highlights.map(item => <li key={item}>{item}</li>)}</ul>
        <p>{role.technologies.join(" · ")}</p>
      </article>)}
    </div></details>
    <details><summary>Education</summary><div>{education.map(item => <article key={item.id}>
      <h3>{item.degree}</h3><p>{item.institution} · {item.period} · {item.grade}</p><p>{item.leadership}</p><p>{item.coursework.join(" · ")}</p>
    </article>)}</div></details>
    <details><summary>Awards and certifications</summary><ul>
      {achievements.map(item => <li key={item.title}><strong>{item.title}</strong><p>{item.description}</p></li>)}
      {certifications.map(item => <li key={item.name}>{item.name} · {item.provider}, {item.year}</li>)}
    </ul></details>
    <button className="folio-link" onClick={onOpenWikiScreen}>Architecture wiki <ArrowUpRight size={15} /></button>
  </section>;
}

