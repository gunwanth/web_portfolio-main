import React, { useEffect, useRef, useState } from "react";
import "./SectionReveal.css";
import { trackSectionView } from "../lib/gtm";

const SectionReveal = ({ index, title, subtitle, id, children }) => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const hasTrackedViewRef = useRef(false);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content || typeof IntersectionObserver === "undefined") {
      setHeadingVisible(true);
      setContentVisible(true);
      return undefined;
    }

    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeadingVisible(true);
      },
      { threshold: 0.08 }
    );
    const contentObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContentVisible(true);
          if (!hasTrackedViewRef.current) {
            hasTrackedViewRef.current = true;
            trackSectionView(id, title);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    headingObserver.observe(wrapper);
    contentObserver.observe(content);

    return () => {
      headingObserver.disconnect();
      contentObserver.disconnect();
    };
  }, [id, title]);

  return (
    <div
      className={`section-reveal-wrapper ${headingVisible ? "is-heading-visible" : ""}`}
      id={id}
      ref={wrapperRef}
    >
      <div className="section-reveal-scene">
        <div className="section-reveal-inner">
          <div className="section-reveal-meta-row">
            {index && <span className="section-reveal-index">{index}</span>}
            {subtitle && <span className="section-reveal-sub">{subtitle}</span>}
          </div>
          <div className="section-reveal-title-row">
            <h2 className="section-reveal-title">{title}</h2>
            <div className="section-reveal-rule" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="section-reveal-content-vt" ref={contentRef}>
        <div className={`section-reveal-content ${contentVisible ? "is-content-visible" : ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SectionReveal;
