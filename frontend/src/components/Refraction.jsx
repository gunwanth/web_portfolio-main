import React, { useEffect, useRef } from "react";

// Each facet samples the same strip of light from a different angle.
function drawLens(canvas, x, y) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width, height } = canvas;
  const radius = Math.min(width * .46, height * .49);
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.scale(radius, radius);
  ctx.rotate(-.19);
  ctx.scale(1, .92);

  const focusX = -.18 + x * .36;
  const focusY = .08 + y * .31;
  const facets = 80;
  const step = Math.PI * 2 / facets;
  for (let i = 0; i < facets; i++) {
    const start = i * step;
    const end = start + step + .001;
    const angle = start + step / 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const incidence = Math.cos(angle - .62 + x * .45 - y * .28);
    const edge = .52 + incidence * .26;
    const caustic = ctx.createLinearGradient(focusX, focusY, dx, dy);
    caustic.addColorStop(0, "#302e2a");
    caustic.addColorStop(.09, "#68625a");
    caustic.addColorStop(edge - .15, "#c9c5b8");
    caustic.addColorStop(edge - .048, "#f7ece0");
    caustic.addColorStop(edge, "#ef673b");
    caustic.addColorStop(edge + .046, "#9c301a");
    caustic.addColorStop(edge + .11, "#4e4238");
    caustic.addColorStop(.96, "#b5b2a6");
    caustic.addColorStop(1, "#dad6c9");

    ctx.beginPath();
    ctx.moveTo(focusX, focusY);
    ctx.lineTo(Math.cos(start), Math.sin(start));
    ctx.arc(0, 0, 1, start, end);
    ctx.closePath();
    ctx.fillStyle = caustic;
    ctx.fill();

    // A narrow reflection on one face gives each sector its cut-glass edge.
    const bevel = ctx.createLinearGradient(dx, dy,
      dx - dy * step, dy + dx * step);
    bevel.addColorStop(0, "rgba(35,31,25,.32)");
    bevel.addColorStop(.42, "rgba(244,238,222,.08)");
    bevel.addColorStop(.83, "rgba(255,253,240,.58)");
    bevel.addColorStop(1, "rgba(55,49,42,.15)");
    ctx.fillStyle = bevel;
    ctx.fill();
  }
  ctx.restore();
}

const clamp = value => Math.max(-1, Math.min(1, value));

export default function Refraction() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let x = 0, y = 0, targetX = 0, targetY = 0;
    let frame = 0, lastTime = 0;

    function advance(time) {
      const dt = lastTime ? Math.min(50, time - lastTime) : 16;
      const ease = 1 - Math.exp(-dt / 95);
      lastTime = time;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      drawLens(canvas, x, y);
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .001) {
        frame = requestAnimationFrame(advance);
      } else {
        frame = 0;
        lastTime = 0;
      }
    }

    function aim(nextX, nextY) {
      if (preference.matches) return;
      targetX = clamp(nextX);
      targetY = clamp(nextY);
      if (!frame) frame = requestAnimationFrame(advance);
    }
    function point(event) {
      const bounds = canvas.getBoundingClientRect();
      aim((event.clientX - bounds.left) / bounds.width * 2 - 1,
        (event.clientY - bounds.top) / bounds.height * 2 - 1);
    }
    function leave(event) {
      if (event.pointerType === "mouse") aim(0, 0);
    }
    function key(event) {
      const offsets = { ArrowLeft: [-.28, 0], ArrowRight: [.28, 0], ArrowUp: [0, -.28], ArrowDown: [0, .28] };
      if (event.key === "Home") {
        event.preventDefault();
        aim(0, 0);
      } else if (offsets[event.key]) {
        event.preventDefault();
        const [dx, dy] = offsets[event.key];
        aim(targetX + dx, targetY + dy);
      }
    }
    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * ratio));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * ratio));
      drawLens(canvas, x, y);
    }
    function applyPreference() {
      cancelAnimationFrame(frame);
      frame = lastTime = x = y = targetX = targetY = 0;
      canvas.tabIndex = preference.matches ? -1 : 0;
      drawLens(canvas, x, y);
    }

    resize();
    applyPreference();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    preference.addEventListener("change", applyPreference);
    canvas.addEventListener("pointermove", point);
    canvas.addEventListener("pointerdown", point);
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("keydown", key);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", applyPreference);
      canvas.removeEventListener("pointermove", point);
      canvas.removeEventListener("pointerdown", point);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("keydown", key);
    };
  }, []);

  return <figure className="refraction">
    <canvas ref={ref} role="img" aria-label="Radially cut glass refracting a band of orange light" aria-describedby="prism-controls" />
    <figcaption id="prism-controls"><span>Sector refraction</span><span className="prism-hint">Move, tap, or use arrow keys</span></figcaption>
  </figure>;
}
