import React, { useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SectionReveal from "./components/SectionReveal";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    let frameId = null;

    const updateHeroZoom = () => {
      frameId = null;
      const progress = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      hero.style.setProperty("--hero-scale", String(1 + progress * 2.2));
      hero.style.setProperty("--hero-opacity", String(1 - progress));
      hero.style.setProperty("--hero-blur", `${progress * 30}px`);
    };

    const requestUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateHeroZoom);
      }
    };

    updateHeroZoom();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* ── Hero with scroll-driven zoom-out (via wrapper) ── */}
      <div className="hero-zoom-wrapper">
        <div className="hero-sticky" ref={heroRef}>
          <Hero />
        </div>
        <div className="hero-zoom-spacer" />
      </div>

      {/* ── Each section gets a 3D reveal heading ── */}
      <SectionReveal id="about" title="About Me" subtitle="who I am">
        <About />
      </SectionReveal>

      <SectionReveal id="experience" title="Experience" subtitle="my journey">
        <Experience />
      </SectionReveal>

      <SectionReveal id="projects" title="Projects" subtitle="what I've built">
        <Projects />
      </SectionReveal>

      <SectionReveal id="skills" title="Skills" subtitle="what I work with">
        <Skills />
      </SectionReveal>

      <SectionReveal
        id="certifications"
        title="Certifications"
        subtitle="continuous learning"
      >
        <Certifications />
      </SectionReveal>

      <SectionReveal
        id="achievements"
        title="Achievements"
        subtitle="milestones"
      >
        <Achievements />
      </SectionReveal>

      <SectionReveal id="contact" title="Contact" subtitle="get in touch">
        <Contact />
      </SectionReveal>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App dark bg-black text-slate-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
