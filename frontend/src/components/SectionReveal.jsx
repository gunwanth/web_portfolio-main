import React from 'react';
import './SectionReveal.css';

/**
 * SectionReveal
 * ─────────────────────────────────────────────────────────────────
 * Scroll sequence:
 *   1. Heading zooms in from far 3D depth → holds → zooms past viewer
 *   2. Content block zooms in from 3D depth → settles into place
 *
 * DOM structure:
 *   .section-reveal-wrapper        ← view-timeline source for heading
 *     .section-reveal-scene        ← sticky, transparent, z:1
 *     .section-reveal-spacer       ← scroll distance for heading
 *     .section-reveal-content-vt   ← view-timeline source for content
 *       .section-reveal-content    ← animated: zooms in from depth
 *         {children}
 */
const SectionReveal = ({ title, subtitle, id, children }) => (
  <div className="section-reveal-wrapper" id={id}>

    {/* ── 1. Sticky heading scene ── */}
    <div className="section-reveal-scene" aria-hidden="true">
      <div className="section-reveal-inner">
        {subtitle && <span className="section-reveal-sub">{subtitle}</span>}
        <span className="section-reveal-title">{title}</span>
        <div className="section-reveal-accent" />
      </div>
    </div>

    {/* ── 2. Spacer: scroll distance for heading animation ── */}
    <div className="section-reveal-spacer" />

    {/* ── 3. Content: outer div defines view-timeline, inner zooms in ── */}
    <div className="section-reveal-content-vt">
      <div className="section-reveal-content">
        {children}
      </div>
    </div>

  </div>
);

export default SectionReveal;
