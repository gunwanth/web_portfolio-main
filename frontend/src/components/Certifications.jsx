import React from "react";
import { Award, CheckCircle2 } from "lucide-react";
import { certifications } from "../data/mock";

const Certifications = () => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="pf-card p-5 flex items-start gap-4 justify-between"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl pf-badge-accent flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base leading-snug mb-1">
                    {cert.name}
                  </h3>
                  <p
                    className="text-xs font-mono font-medium"
                    style={{ color: "var(--pf-accent-text)" }}
                  >
                    {cert.provider}
                  </p>
                  <p
                    className="text-[11px] font-mono mt-1"
                    style={{ color: "var(--pf-text-muted)" }}
                  >
                    Issued · {cert.year}
                  </p>
                </div>
              </div>
              <CheckCircle2
                className="w-4 h-4 flex-shrink-0 mt-1"
                style={{ color: "var(--pf-success)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
