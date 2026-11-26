import React, { useState, useEffect } from "react";
import {
  Search,
  Download,
  BookOpen,
  Layers,
  Mail,
  Github,
  Linkedin,
  ArrowRight,
  X
} from "lucide-react";
import { colorContexts, projects, personalInfo } from "../data/mock";
import { toast } from "../hooks/use-toast";

const CommandPalette = ({
  isOpen,
  onClose,
  activeThemeId,
  setActiveThemeId,
  onDownloadResume,
  onSelectProject,
  onOpenWikiScreen,
  onNavigateHome
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const actions = [
    {
      group: "Quick actions",
      items: [
        {
          id: "act-wiki",
          label: "Architecture wiki",
          icon: <BookOpen className="w-4 h-4" />,
          onSelect: () => {
            onClose();
            if (onOpenWikiScreen) onOpenWikiScreen();
          }
        },
        {
          id: "act-resume",
          label: "Download résumé (PDF)",
          icon: <Download className="w-4 h-4" />,
          onSelect: () => {
            onClose();
            onDownloadResume();
          }
        },
        {
          id: "act-email",
          label: `Copy Email Address (${personalInfo.email})`,
          icon: <Mail className="w-4 h-4" />,
          onSelect: () => {
            navigator.clipboard.writeText(personalInfo.email);
            toast({
              title: "Email Copied",
              description: personalInfo.email
            });
            onClose();
          }
        },
        {
          id: "act-github",
          label: "Open GitHub Profile (github.com/gunwanth)",
          icon: <Github className="w-4 h-4" />,
          onSelect: () => {
            window.open(personalInfo.github, "_blank");
            onClose();
          }
        },
        {
          id: "act-linkedin",
          label: "Open LinkedIn Profile (linkedin.com/in/gunvanth-m)",
          icon: <Linkedin className="w-4 h-4" />,
          onSelect: () => {
            window.open(personalInfo.linkedin, "_blank");
            onClose();
          }
        }
      ]
    },
    {
      group: "Case studies",
      items: projects.map((p) => ({
        id: `proj-${p.id}`,
        label: `${p.title}`,
        icon: <Layers className="w-4 h-4" />,
        onSelect: () => {
          onClose();
          if (onSelectProject) onSelectProject(p);
        }
      }))
    },
    {
      group: "Theme",
      items: colorContexts.map((ctx) => ({
        id: `theme-${ctx.id}`,
        label: `${ctx.name}`,
        active: ctx.id === activeThemeId,
        icon: (
          <span
            className="w-3.5 h-3.5 rounded-full inline-block"
            style={{ backgroundColor: ctx.primaryHex }}
          />
        ),
        onSelect: () => {
          setActiveThemeId(ctx.id);
          onClose();
        }
      }))
    },
    {
      group: "Homepage Sections",
      items: [
        {
          id: "sec-proj",
          label: "Selected work",
          icon: <ArrowRight className="w-4 h-4" />,
          onSelect: () => {
            onClose();
            if (onNavigateHome) onNavigateHome("case-studies");
          }
        },
        {
          id: "sec-skills",
          label: "Skills & tools",
          icon: <ArrowRight className="w-4 h-4" />,
          onSelect: () => {
            onClose();
            onNavigateHome("skills");
          }
        },
        {
          id: "sec-work",
          label: "About",
          icon: <ArrowRight className="w-4 h-4" />,
          onSelect: () => {
            onClose();
            if (onNavigateHome) onNavigateHome("workbench");
          }
        },
        {
          id: "sec-contact",
          label: "Contact",
          icon: <ArrowRight className="w-4 h-4" />,
          onSelect: () => {
            onClose();
            if (onNavigateHome) onNavigateHome("contact");
          }
        }
      ]
    }
  ];

  const q = query.trim().toLowerCase();
  const filteredGroups = actions
    .map((g) => ({
      ...g,
      items: g.items.filter((item) => item.label.toLowerCase().includes(q))
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      role="dialog" aria-modal="true" aria-label="Search portfolio"
      onKeyDown={e => { if (e.key === "Escape") onClose(); }}
      onClick={onClose}
    >
      <div
        className="pf-card-static max-w-2xl w-full overflow-hidden shadow-2xl"
        style={{ backgroundColor: "var(--pf-surface)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center gap-3 px-4 py-3.5 border-b"
          style={{ borderColor: "var(--pf-border)" }}
        >
          <Search className="w-4 h-4" style={{ color: "var(--pf-accent)" }} />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, themes, and actions…"
            className="w-full bg-transparent text-sm font-mono outline-none"
            style={{ color: "var(--pf-text-primary)" }}
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="pf-btn-outline p-1.5 rounded-md text-xs font-mono"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-3 space-y-4">
          {filteredGroups.length === 0 ? (
            <div
              className="py-8 text-center text-xs font-mono"
              style={{ color: "var(--pf-text-muted)" }}
            >
              No matching commands or case studies found.
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.group}>
                <div
                  className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: "var(--pf-text-muted)" }}
                >
                  {group.group}
                </div>
                <div className="space-y-1 mt-1">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={item.onSelect}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between gap-3 transition-colors ${
                        item.active
                          ? "pf-badge-accent"
                          : "hover:bg-[var(--pf-surface-raised)]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span style={{ color: "var(--pf-accent)" }}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.active && (
                        <span className="text-[10px] font-bold">ACTIVE</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div
          className="px-4 py-2.5 border-t flex items-center justify-between text-[11px] font-mono"
          style={{
            borderColor: "var(--pf-border)",
            color: "var(--pf-text-muted)"
          }}
        >
          <span>Press ESC or click outside to close</span>
          <span>⌘K / Ctrl+K Command Palette</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
