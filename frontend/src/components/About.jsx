import React from "react";
import {
  GraduationCap,
  MapPin,
  Languages,
  Users,
  ShieldCheck,
  Cpu,
  Network,
  Layers,
  CheckCircle2,
  Building2
} from "lucide-react";
import { personalInfo, education } from "../data/mock";

const architecturalPillars = [
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Agentic RAG & Rubric QA",
    description:
      "Designing multi-stage semantic retrieval pipelines with vector embeddings and rubric-driven LLM evaluation to guarantee context-grounded responses."
  },
  {
    icon: <Network className="w-5 h-5" />,
    title: "Neuro-Symbolic & Graph-RAG",
    description:
      "Combining Neo4j knowledge graphs, DuckDB rule evaluators, and Pydantic evidence contracts for zero-hallucination enterprise reasoning."
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Deterministic Safety Kernels",
    description:
      "Enforcing T0–T3 Ghost Validation, Consolidated Numeric Verifiers, and 1-tap human approval switches before high-risk model executions."
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Resilient Full-Stack Delivery",
    description:
      "Owning features end-to-end across FastAPI, React/Next.js, dual-database failover routers, offline IndexedDB caches, and CI/CD pipelines."
  }
];

const About = () => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column (7 cols): Executive Narrative & 4 Architectural Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="pf-card p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-3" style={{ color: "var(--pf-accent-text)" }}>
                <Building2 className="w-4 h-4" />
                <span>Engineering Synthesis</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold mb-4">
                Bridging Probabilistic AI with Deterministic Software Architecture
              </h3>

              <p
                className="text-sm sm:text-base leading-relaxed mb-4"
                style={{ color: "var(--pf-text-secondary)" }}
              >
                {personalInfo.about}
              </p>

              <p
                className="text-sm sm:text-base leading-relaxed mb-6"
                style={{ color: "var(--pf-text-secondary)" }}
              >
                {personalInfo.summary}
              </p>

              <div
                className="grid sm:grid-cols-3 gap-3 pt-4 border-t text-xs font-mono"
                style={{ borderColor: "var(--pf-border)" }}
              >
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg pf-surface-raised">
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "var(--pf-accent)" }} />
                  <div>
                    <div className="text-[10px] uppercase" style={{ color: "var(--pf-text-muted)" }}>
                      Location
                    </div>
                    <div className="font-semibold">{personalInfo.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-lg pf-surface-raised">
                  <Building2 className="w-4 h-4 flex-shrink-0" style={{ color: "var(--pf-accent)" }} />
                  <div>
                    <div className="text-[10px] uppercase" style={{ color: "var(--pf-text-muted)" }}>
                      Current Role
                    </div>
                    <div className="font-semibold">AAVI Labs (Full Stack AI)</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-lg pf-surface-raised">
                  <Languages className="w-4 h-4 flex-shrink-0" style={{ color: "var(--pf-accent)" }} />
                  <div>
                    <div className="text-[10px] uppercase" style={{ color: "var(--pf-text-muted)" }}>
                      Languages
                    </div>
                    <div className="font-semibold">English, Hindi, Telugu</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Architectural Pillars Bento Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {architecturalPillars.map((pillar, idx) => (
                <div key={idx} className="pf-card p-5">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="p-2 rounded-lg pf-badge-accent">
                      {pillar.icon}
                    </div>
                    <h4 className="font-display font-bold text-base">
                      {pillar.title}
                    </h4>
                  </div>
                  <p
                    className="text-xs sm:text-sm leading-relaxed"
                    style={{ color: "var(--pf-text-secondary)" }}
                  >
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Education & AI Club Technical Leadership */}
          <div className="lg:col-span-5 space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="pf-card p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider" style={{ color: "var(--pf-accent-text)" }}>
                      <GraduationCap className="w-4 h-4" />
                      <span>Academic Foundation</span>
                    </div>
                    <span className="pf-badge-accent px-2.5 py-1 rounded-md text-xs font-mono font-bold">
                      {edu.grade}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold leading-snug mb-2">
                    {edu.degree}
                  </h3>

                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: "var(--pf-accent-text)" }}
                  >
                    {edu.institution}
                  </p>

                  <div
                    className="flex items-center justify-between text-xs font-mono mb-6 pb-4 border-b"
                    style={{
                      color: "var(--pf-text-muted)",
                      borderColor: "var(--pf-border)"
                    }}
                  >
                    <span>{edu.location}</span>
                    <span>{edu.period}</span>
                  </div>

                  {/* Highlighted Campus Leadership Callout from Page 2 of Resume */}
                  <div className="p-4 rounded-xl pf-surface-raised mb-6">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold mb-1.5" style={{ color: "var(--pf-accent-text)" }}>
                      <Users className="w-4 h-4" />
                      <span>Leadership · AI Club Tech Lead at GVPC(E)</span>
                    </div>
                    <p
                      className="text-xs sm:text-sm leading-relaxed"
                      style={{ color: "var(--pf-text-secondary)" }}
                    >
                      {edu.leadership}
                    </p>
                  </div>

                  {/* Core Coursework */}
                  <div>
                    <h4
                      className="text-xs font-mono uppercase tracking-wider mb-3"
                      style={{ color: "var(--pf-text-muted)" }}
                    >
                      Core Specialization Domains
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {edu.coursework.map((course, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs sm:text-sm"
                          style={{ color: "var(--pf-text-secondary)" }}
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 flex-shrink-0"
                            style={{ color: "var(--pf-accent)" }}
                          />
                          <span>{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono"
                  style={{
                    borderColor: "var(--pf-border)",
                    color: "var(--pf-text-muted)"
                  }}
                >
                  <span>Specialization: AI & Machine Learning</span>
                  <span style={{ color: "var(--pf-success)" }}>● Graduating Apr 2026</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
