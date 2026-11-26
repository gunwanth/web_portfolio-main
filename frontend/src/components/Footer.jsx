import React from "react";
import { ArrowUp } from "lucide-react";
import { colorContexts } from "../data/mock";

export default function Footer({ activeTheme, setActiveThemeId }) {
  return <footer className="folio-footer folio-wrap">
    <span>© {new Date().getFullYear()} Gunvanth Madabattula</span>
    <div>
      <select aria-label="Color theme" value={activeTheme.id} onChange={e => setActiveThemeId(e.target.value)}>
        {colorContexts.map(theme => <option key={theme.id} value={theme.id}>{theme.name}</option>)}
      </select>
      <button onClick={() => window.scrollTo({ top: 0 })}>Back to top <ArrowUp size={14} /></button>
    </div>
  </footer>;
}
