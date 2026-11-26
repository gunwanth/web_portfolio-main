import React from "react";
import { Search } from "lucide-react";
import { ReactComponent as BrandMark } from "../assets/gm-logo.svg";
import { Link } from "react-router-dom";
import { spaceUrl } from "../lib/spaces";
import { trackNavigationClick } from "../lib/gtm";

const links = [
  ["Work", "home", "case-studies"], ["Skills", "home", "skills"],
  ["About", "home", "workbench"], ["Wiki", "wiki"], ["Contact", "home", "contact"]
];

export default function Header({ onOpenCommand }) {
  return (
    <header className="folio-header">
      <div className="folio-wrap folio-nav">
        <Link className="wordmark" to={spaceUrl("home")} onClick={() => trackNavigationClick("home", "header")} aria-label="Gunvanth Madabattula, home">
          <BrandMark aria-hidden="true" focusable="false" />
        </Link>
        <nav aria-label="Main navigation">
          {links.map(([label, space, section]) => (
            <Link key={label} to={spaceUrl(space, section)} onClick={() => trackNavigationClick(section || space, "header")}>{label}</Link>
          ))}
          <button className="quick-search" onClick={onOpenCommand} aria-label="Search portfolio" title="Search portfolio (Ctrl or Command + K)"><Search size={17} /></button>
        </nav>
      </div>
    </header>
  );
}
