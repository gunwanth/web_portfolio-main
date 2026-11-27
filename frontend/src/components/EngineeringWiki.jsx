import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import {
  FileCode2,
  CheckCircle2,
  Copy,
  Check,
  ArrowLeft
} from "lucide-react";
import { engineeringWiki, personalInfo } from "../data/mock";
import { toast } from "../hooks/use-toast";

const EngineeringWiki = ({ isStandaloneScreen = false, onBack }) => {
  const [activeTabId, setActiveTabId] = useState("architecture");
  const [copiedWiki, setCopiedWiki] = useState(false);

  const activeTab =
    engineeringWiki.tabs.find((t) => t.id === activeTabId) ||
    engineeringWiki.tabs[0];

  const handleCopyNotionMarkdown = () => {
    const mdLines = [
      `# ${personalInfo.name} — Engineering Wiki & Architecture Reference`,
      `> **Active Role:** ${engineeringWiki.statusSummary.activeRole}`,
      `> **Core Engineering Principle:** ${engineeringWiki.statusSummary.corePrinciple}`,
      "",
      "## 1. System Architectures & Blueprints",
      ...engineeringWiki.tabs[0].items.map(
        (item) =>
          `### ${item.title} (${item.status})\n- **Problem:** ${item.problem}\n- **Architecture Solution:** ${item.solution}\n- **Tradeoff:** ${item.tradeoff}\n- **Stack:** \`${item.stack}\`\n`
      ),
      "## 2. Accepted Architecture Decision Records (ADRs)",
      ...engineeringWiki.tabs[1].items.map(
        (adr) =>
          `### ${adr.code}: ${adr.title} [${adr.status}]\n- **Context:** ${adr.context}\n- **Decision:** ${adr.decision}\n- **Consequence:** ${adr.consequence}\n`
      ),
      "## 3. Delivery & Verified Impact Log",
      "| System | Role | State | Verified Outcome |",
      "| :--- | :--- | :--- | :--- |",
      ...engineeringWiki.tabs[2].items.map(
        (row) => `| **${row.system}** | ${row.role} | \`${row.state}\` | ${row.outcome} |`
      )
    ];

    navigator.clipboard.writeText(mdLines.join("\n"));
    setCopiedWiki(true);
    toast({
      title: "Engineering Wiki Copied as Notion Markdown",
      description: "Ready to paste directly into any Notion page or engineering doc."
    });
    setTimeout(() => setCopiedWiki(false), 3000);
  };

  return (
    <div className={isStandaloneScreen ? "folio-detail" : ""}>
      <div className="folio-wrap">
        {isStandaloneScreen && onBack && (
          <div className="mb-6">
            <button
              onClick={onBack}
              className="pf-btn-outline px-4 py-2 rounded-xl text-xs font-mono inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" style={{ color: "var(--pf-accent)" }} />
              <span>Back to about</span>
            </button>
          </div>
        )}

        <div className="pf-card p-6 sm:p-8">
          {/* Top Bar with Dropdown View Selector instead of cluttered button rows */}
          <div
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-6 border-b"
            style={{ borderColor: "var(--pf-border)" }}
          >
            <div>
              <h1 className="detail-title">Architecture wiki</h1>
              <p
                className="text-xs sm:text-sm mt-1 max-w-2xl"
                style={{ color: "var(--pf-text-secondary)" }}
              >
                {engineeringWiki.statusSummary.corePrinciple}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Compact Dropdown View Switcher */}
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--pf-text-muted)" }}
                >
                  Wiki Section:
                </span>
                <select
                  value={activeTabId}
                  onChange={(e) => setActiveTabId(e.target.value)}
                  className="pf-select"
                  aria-label="Select Engineering Wiki Section"
                >
                  {engineeringWiki.tabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>
                      {tab.label} ({tab.badge})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleCopyNotionMarkdown}
                className="pf-btn-outline px-3.5 py-2 rounded-xl text-xs font-mono inline-flex items-center gap-2"
              >
                {copiedWiki ? (
                  <>
                    <Check
                      className="w-3.5 h-3.5"
                      style={{ color: "var(--pf-success)" }}
                    />
                    <span>Copied Markdown</span>
                  </>
                ) : (
                  <>
                    <Copy
                      className="w-3.5 h-3.5"
                      style={{ color: "var(--pf-accent)" }}
                    />
                    <span>Copy for Notion</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tab 1: System Architectures */}
          {activeTab.id === "architecture" && (
            <div className="grid md:grid-cols-2 gap-4">
              {activeTab.items.map((item) => (
                <ScrollReveal
                  key={item.id}
                  className="p-5 rounded-xl pf-surface-raised flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="pf-badge-accent px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold">
                        {item.status}
                      </span>
                      <FileCode2
                        className="w-4 h-4"
                        style={{ color: "var(--pf-accent)" }}
                      />
                    </div>
                    <h4 className="font-display text-base font-bold mb-2.5">
                      {item.title}
                    </h4>

                    <div className="space-y-2 text-xs leading-relaxed">
                      <div>
                        <span
                          className="font-mono font-semibold uppercase"
                          style={{ color: "var(--pf-text-muted)" }}
                        >
                          Problem:{" "}
                        </span>
                        <span style={{ color: "var(--pf-text-secondary)" }}>
                          {item.problem}
                        </span>
                      </div>
                      <div>
                        <span
                          className="font-mono font-semibold uppercase"
                          style={{ color: "var(--pf-accent-text)" }}
                        >
                          Architecture:{" "}
                        </span>
                        <span style={{ color: "var(--pf-text-secondary)" }}>
                          {item.solution}
                        </span>
                      </div>
                      <div>
                        <span
                          className="font-mono font-semibold uppercase"
                          style={{ color: "var(--pf-success)" }}
                        >
                          Trade-off:{" "}
                        </span>
                        <span style={{ color: "var(--pf-text-secondary)" }}>
                          {item.tradeoff}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-4 pt-2.5 border-t text-[11px] font-mono"
                    style={{
                      borderColor: "var(--pf-border)",
                      color: "var(--pf-text-muted)"
                    }}
                  >
                    Stack: {item.stack}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Tab 2: Architecture Decision Records (ADRs) */}
          {activeTab.id === "decisions" && (
            <div className="grid md:grid-cols-3 gap-4">
              {activeTab.items.map((adr) => (
                <ScrollReveal
                  key={adr.id}
                  className="p-5 rounded-xl pf-surface-raised flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded pf-badge-accent">
                        {adr.code}
                      </span>
                      <span
                        className="text-xs font-mono font-semibold"
                        style={{ color: "var(--pf-success)" }}
                      >
                        ● {adr.status}
                      </span>
                    </div>

                    <h4 className="font-display text-base font-bold mb-2">
                      {adr.title}
                    </h4>

                    <p
                      className="text-[11px] font-mono mb-3"
                      style={{ color: "var(--pf-text-muted)" }}
                    >
                      Scope: {adr.context}
                    </p>

                    <div className="space-y-2 text-xs leading-relaxed">
                      <div>
                        <div
                          className="font-mono text-[10px] uppercase font-semibold mb-0.5"
                          style={{ color: "var(--pf-accent-text)" }}
                        >
                          Decision
                        </div>
                        <p style={{ color: "var(--pf-text-secondary)" }}>
                          {adr.decision}
                        </p>
                      </div>
                      <div>
                        <div
                          className="font-mono text-[10px] uppercase font-semibold mb-0.5"
                          style={{ color: "var(--pf-success)" }}
                        >
                          Consequence
                        </div>
                        <p style={{ color: "var(--pf-text-secondary)" }}>
                          {adr.consequence}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Tab 3: Delivery & Impact Log Table */}
          {activeTab.id === "delivery" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr
                    className="border-b font-mono text-xs uppercase"
                    style={{
                      borderColor: "var(--pf-border)",
                      color: "var(--pf-text-muted)"
                    }}
                  >
                    <th className="py-3 px-4">System / Platform</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Verified Delivery & Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTab.items.map((row) => (
                    <ScrollReveal as="tr"
                      key={row.id}
                      className="border-b hover:bg-[var(--pf-surface-raised)] transition-colors"
                      style={{ borderColor: "var(--pf-border)" }}
                    >
                      <td className="py-3.5 px-4 font-display font-bold">
                        {row.system}
                      </td>
                      <td
                        className="py-3.5 px-4 font-mono text-xs"
                        style={{ color: "var(--pf-accent-text)" }}
                      >
                        {row.role}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="pf-badge-accent px-2.5 py-0.5 rounded text-xs font-mono whitespace-nowrap">
                          {row.state}
                        </span>
                      </td>
                      <td
                        className="py-3.5 px-4 leading-relaxed"
                        style={{ color: "var(--pf-text-secondary)" }}
                      >
                        {row.outcome}
                      </td>
                    </ScrollReveal>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EngineeringWiki;
