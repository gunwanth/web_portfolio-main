import React, { useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowDownToLine } from "lucide-react";
import { ReactComponent as BrandMark } from "../assets/gm-logo.svg";
import Refraction from "./Refraction";
import { personalInfo } from "../data/mock";
import { useMobileLayout, useStaticMotion } from "../hooks/useStaticMotion";

let hasOpened = false;
const names = [
  { word: "Gunvanth", start: 0, width: 59 },
  { word: "Madabattula", start: 59, width: 53 }
];

export default function Hero({ onDownloadResume }) {
  const hero = useRef(null);
  const staticMotion = useStaticMotion();
  const mobile = useMobileLayout();
  const [opening, setOpening] = useState(() => !staticMotion && !hasOpened &&
    !window.location.hash && window.scrollY === 0);

  useLayoutEffect(() => {
    hasOpened = true;
    if (!opening) return;
    if (staticMotion) {
      setOpening(false);
      return;
    }

    const section = hero.current;
    const bounds = section.getBoundingClientRect();
    const anchors = section.querySelectorAll(".name-anchor");
    const markHeight = Math.min(88, parseFloat(getComputedStyle(anchors[0]).fontSize) * .8);
    const left = bounds.left + (bounds.width - markHeight * 112 / 58) / 2;
    const top = bounds.top + (bounds.height - markHeight) / 2;
    section.style.setProperty("--mark-height", markHeight + "px");
    anchors.forEach((anchor, index) => {
      const rect = anchor.getBoundingClientRect();
      const slice = names[index];
      anchor.style.setProperty("--mark-width", markHeight * slice.width / 58 + "px");
      anchor.style.setProperty("--from-x", left + markHeight * slice.start / 58 - rect.left + "px");
      anchor.style.setProperty("--from-y", top - rect.top + "px");
    });

    const finish = () => setOpening(false);
    const viewportWidth = window.innerWidth;
    const skipOnScroll = () => { if (window.scrollY !== 0) finish(); };
    const skipOnResize = () => { if (window.innerWidth !== viewportWidth) finish(); };
    const interrupts = { pointerdown: finish, keydown: finish, scroll: skipOnScroll, resize: skipOnResize };
    Object.entries(interrupts).forEach(([type, handler]) => window.addEventListener(type, handler, { passive: true }));
    const timer = window.setTimeout(finish, 1700);
    return () => {
      clearTimeout(timer);
      Object.entries(interrupts).forEach(([type, handler]) => window.removeEventListener(type, handler));
    };
  }, [opening, staticMotion]);

  return (
    <section ref={hero} className={mobile ? "folio-hero folio-hero-text-only" : "folio-hero"} data-opening={opening || undefined} aria-labelledby="intro-name">
      <div className="intro-copy">
        <p className="folio-meta">{personalInfo.currentRole}</p>
        <h1 id="intro-name" aria-label="Gunvanth Madabattula">
          {names.map(({ word, start, width }) => (
            <span className="name-line" aria-hidden="true" key={word}>
              <span className="name-anchor">
                <span className="name-initial">
                  {opening && <BrandMark className="name-facet" viewBox={`${start} 0 ${width} 58`} focusable="false" />}
                  <span className="name-letter">{word[0]}</span>
                </span>
              </span><span className="name-rest">{word.slice(1)}</span>
            </span>
          ))}
        </h1>
        <p className="intro-text">I develop search tools and AI applications at Bangalore-based {personalInfo.currentCompany}, working remotely from {personalInfo.location.split(",")[0]}.</p>
        <div className="intro-actions">
          <a className="folio-button" href="#case-studies">View my work <ArrowDown size={15} /></a>
          <button className="folio-link" onClick={onDownloadResume}>Résumé <ArrowDownToLine size={14} /></button>
        </div>
      </div>
      {!mobile && <Refraction />}
    </section>
  );
}
