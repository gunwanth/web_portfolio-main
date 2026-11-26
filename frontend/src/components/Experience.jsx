import React from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  TrendingUp,
  Lightbulb,
  CheckCircle2
} from "lucide-react";
import { experiences } from "../data/mock";

const Experience = () => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="pf-card p-6 sm:p-8 relative overflow-hidden">
              {/* Top Row: Role, Company, Period, Badge */}
              <div
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-6 border-b"
                style={{ borderColor: "var(--pf-border)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl pf-badge-accent flex-shrink-0 mt-0.5">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display text-xl sm:text-2xl font-bold">
                        {exp.title}
                      </h3>
                      <span className="pf-badge-accent px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold">
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm">
                      <span
                        className="font-semibold"
                        style={{ color: "var(--pf-accent-text)" }}
                      >
                        {exp.company}
                      </span>
                      <span style={{ color: "var(--pf-text-muted)" }}>·</span>
                      <span
                        className="inline-flex items-center gap-1 text-xs font-mono"
                        style={{ color: "var(--pf-text-muted)" }}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:items-end gap-1">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg pf-surface-raised text-xs font-mono font-semibold"
                    style={{ color: "var(--pf-text-primary)" }}
                  >
                    <Calendar className="w-3.5 h-3.5" style={{ color: "var(--pf-accent)" }} />
                    <span>{exp.period}</span>
                  </div>
                  <span
                    className="text-[11px] font-mono"
                    style={{ color: "var(--pf-text-muted)" }}
                  >
                    0{index + 1} // {exp.domain}
                  </span>
                </div>
              </div>

              {/* Main Body Grid: Responsibilities on Left (7 cols), What We Gained & Impact Made on Right (5 cols) */}
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <p
                    className="text-sm sm:text-base leading-relaxed font-medium"
                    style={{ color: "var(--pf-text-secondary)" }}
                  >
                    {exp.description}
                  </p>

                  <div className="space-y-2.5 pt-1">
                    {exp.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed"
                        style={{ color: "var(--pf-text-secondary)" }}
                      >
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: "var(--pf-accent)" }}
                        />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Synthesis Panel: What We Gained & Effect We Made */}
                <div className="lg:col-span-5 space-y-4">
                  {exp.gained && (
                    <div className="p-4 rounded-xl pf-surface-raised">
                      <div
                        className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider mb-1.5"
                        style={{ color: "var(--pf-accent-text)" }}
                      >
                        <Lightbulb className="w-4 h-4" />
                        <span>What We Gained · Engineering Growth</span>
                      </div>
                      <p
                        className="text-xs sm:text-sm leading-relaxed"
                        style={{ color: "var(--pf-text-secondary)" }}
                      >
                        {exp.gained}
                      </p>
                    </div>
                  )}

                  {exp.impact && (
                    <div className="p-4 rounded-xl pf-surface-raised">
                      <div
                        className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider mb-1.5"
                        style={{ color: "var(--pf-success)" }}
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span>Effect & Impact Made</span>
                      </div>
                      <p
                        className="text-xs sm:text-sm leading-relaxed"
                        style={{ color: "var(--pf-text-secondary)" }}
                      >
                        {exp.impact}
                      </p>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  {exp.technologies && (
                    <div className="pt-1">
                      <div
                        className="text-[11px] font-mono uppercase tracking-wider mb-2"
                        style={{ color: "var(--pf-text-muted)" }}
                      >
                        Technologies & Tooling
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md text-xs font-mono pf-surface-raised"
                            style={{ color: "var(--pf-text-secondary)" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
