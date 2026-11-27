import React from "react";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  GitCompare,
  Layers
} from "lucide-react";
import { projects } from "../data/mock";
import ScrollReveal from "./ScrollReveal";

const CaseStudyScreen = ({ project, onBack, onSelectProject }) => {
  if (!project) return null;

  return (
    <main className="folio-detail">
      <div className="folio-wrap">
        {/* Top Action & Dropdown Switcher Bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-8 border-b"
          style={{ borderColor: "var(--pf-border)" }}
        >
          <button
            onClick={onBack}
            className="pf-btn-outline px-4 py-2 rounded-xl text-xs font-mono inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" style={{ color: "var(--pf-accent)" }} />
            <span>Back to work</span>
          </button>

          <div className="flex flex-wrap items-center gap-3">
            {/* Dropdown Switcher to jump between all 8 case studies without scrolling */}
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-mono hidden sm:inline"
                style={{ color: "var(--pf-text-muted)" }}
              >
                Project
              </span>
              <select
                value={project.slug}
                onChange={(e) => {
                  const found = projects.find((p) => p.slug === e.target.value);
                  if (found) onSelectProject(found);
                }}
                className="pf-select"
                aria-label="Switch Project Case Study"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.slug}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pf-btn-outline px-3.5 py-2 rounded-xl text-xs font-mono inline-flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="pf-btn-primary px-4 py-2 rounded-xl text-xs font-mono inline-flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Platform</span>
              </a>
            )}
          </div>
        </div>

        {/* Case Study Header */}
        <ScrollReveal className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="pf-badge-accent px-3 py-1 rounded-md text-xs font-mono font-semibold">
              {project.category}
            </span>
            <span
              className="text-xs font-mono"
              style={{ color: "var(--pf-text-muted)" }}
            >
              Role: {project.role} · {project.period}
            </span>
          </div>

          <h1 className="detail-title mb-2">
            {project.title}
          </h1>
          <p
            className="text-sm sm:text-base font-mono mb-4"
            style={{ color: "var(--pf-accent-text)" }}
          >
            {project.subtitle}
          </p>
          <p
            className="text-sm sm:text-base leading-relaxed max-w-4xl"
            style={{ color: "var(--pf-text-secondary)" }}
          >
            {project.description}
          </p>

          {/* Tech Stack Row */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-mono pf-surface-raised"
                style={{ color: "var(--pf-text-secondary)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* 1. Hard Numbers & Verified Benchmarks */}
        {project.benchmarks && (
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {project.benchmarks.map((b, idx) => (
              <ScrollReveal key={idx} className="pf-card p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className="text-xs font-mono uppercase tracking-wider"
                    style={{ color: "var(--pf-text-muted)" }}
                  >
                    {b.label}
                  </span>
                  <BarChart3
                    className="w-4 h-4"
                    style={{ color: "var(--pf-accent)" }}
                  />
                </div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold pf-gradient-text mb-2">
                  {b.value}
                </div>
                <p
                  className="text-[11px] font-mono"
                  style={{ color: "var(--pf-text-muted)" }}
                >
                  {b.note}
                </p>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* 2. Problem Bottleneck vs. Architectural Trade-Offs */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ScrollReveal className="pf-card p-6">
            <div
              className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider mb-2.5"
              style={{ color: "var(--pf-accent-text)" }}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Problem</span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--pf-text-secondary)" }}
            >
              {project.problem}
            </p>
          </ScrollReveal>

          <ScrollReveal className="pf-card p-6">
            <div
              className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider mb-2.5"
              style={{ color: "var(--pf-success)" }}
            >
              <GitCompare className="w-4 h-4" />
              <span>Design decisions</span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--pf-text-secondary)" }}
            >
              {project.tradeoffs}
            </p>
          </ScrollReveal>
        </div>

        {/* 4. End-to-End Execution Lifecycle (4 Phases) */}
        {project.endToEnd && (
          <div className="pf-card p-6 mb-8">
            <div
              className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider mb-4"
              style={{ color: "var(--pf-accent-text)" }}
            >
              <Layers className="w-4 h-4" />
              <span>End-to-End Execution Lifecycle</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.endToEnd.map((step, idx) => (
                <ScrollReveal key={idx} className="p-4 rounded-xl pf-surface-raised">
                  <div
                    className="text-[11px] font-mono font-bold uppercase mb-1"
                    style={{ color: "var(--pf-accent-text)" }}
                  >
                    Phase 0{idx + 1} · {step.phase}
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--pf-text-secondary)" }}
                  >
                    {step.detail}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* 5. Implementation Details + What We Gained & Effect Made */}
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 pf-card p-6">
            <div
              className="text-xs font-mono uppercase tracking-wider font-semibold mb-4"
              style={{ color: "var(--pf-text-muted)" }}
            >
              What I built
            </div>
            <div className="space-y-3">
              {project.highlights.map((hl, idx) => (
                <ScrollReveal
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed"
                  style={{ color: "var(--pf-text-secondary)" }}
                >
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "var(--pf-accent)" }}
                  />
                  <span>{hl}</span>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal className="pf-card p-5">
              <div
                className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider mb-2"
                style={{ color: "var(--pf-accent-text)" }}
              >
                <Lightbulb className="w-4 h-4" />
                <span>What We Gained (Engineering Mastery)</span>
              </div>
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: "var(--pf-text-secondary)" }}
              >
                {project.gained}
              </p>
            </ScrollReveal>

            <ScrollReveal className="pf-card p-5">
              <div
                className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider mb-2"
                style={{ color: "var(--pf-success)" }}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Effect & Measurable Impact Made</span>
              </div>
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: "var(--pf-text-secondary)" }}
              >
                {project.impact}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CaseStudyScreen;
