import React, { useRef, useState } from "react";
import { useInView } from "motion/react";

const viewport = { once: true };

export default function ScrollReveal({ as: Tag = "div", className = "", style, children }) {
  const ref = useRef(null);
  const canObserve = typeof IntersectionObserver !== "undefined";
  const inView = useInView(ref, viewport);
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <Tag
      ref={canObserve ? ref : undefined}
      className={`scroll-reveal ${className}`.trim()}
      style={style}
      data-reveal-pending={canObserve && !inView && !hasFocus ? "" : undefined}
      onFocusCapture={() => setHasFocus(true)}
    >
      {children}
    </Tag>
  );
}
