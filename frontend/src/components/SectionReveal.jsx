import React, { useEffect, useRef, useState } from 'react';
import './SectionReveal.css';

const SectionReveal = ({ title, subtitle, id, children }) => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content || typeof IntersectionObserver === 'undefined') {
      setHeadingVisible(true);
      setContentVisible(true);
      return undefined;
    }

    const headingObserver = new IntersectionObserver(
      ([entry]) => setHeadingVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    const contentObserver = new IntersectionObserver(
      ([entry]) => setContentVisible(entry.isIntersecting),
      { rootMargin: '0px 0px -15% 0px', threshold: 0.12 }
    );

    headingObserver.observe(wrapper);
    contentObserver.observe(content);

    return () => {
      headingObserver.disconnect();
      contentObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`section-reveal-wrapper ${headingVisible ? 'is-heading-visible' : ''}`}
      id={id}
      ref={wrapperRef}
    >
      <div className="section-reveal-scene" aria-hidden="true">
        <div className="section-reveal-inner">
          {subtitle && <span className="section-reveal-sub">{subtitle}</span>}
          <span className="section-reveal-title">{title}</span>
          <div className="section-reveal-accent" />
        </div>
      </div>

      <div className="section-reveal-content-vt" ref={contentRef}>
        <div className={`section-reveal-content ${contentVisible ? 'is-content-visible' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SectionReveal;
