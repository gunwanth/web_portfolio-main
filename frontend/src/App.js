import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { spaceUrl } from "./lib/spaces";
import "./App.css";
import "./portfolio.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ScrollReveal from "./components/ScrollReveal";
import WorkbenchSection from "./components/WorkbenchSection";
import CaseStudyScreen from "./components/CaseStudyScreen";
import EngineeringWiki from "./components/EngineeringWiki";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import SEO from "./components/SEO";
import { Toaster } from "./components/ui/toaster";
import { toast } from "./hooks/use-toast";
import { colorContexts, projects } from "./data/mock";
import {
  initGTM,
  trackPageView,
  trackResumeDownload,
  trackNavigationClick,
  trackProjectClick
} from "./lib/gtm";

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "").trim();

function App() {
  const [activeThemeId, setActiveThemeId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("pf_color_context_v2") || "clinical-paper";
    }
    return "clinical-paper";
  });

  const location = useLocation();
  const navigate = useNavigate();
  const spaceId = new URLSearchParams(location.search).get("space") ?? "home";
  const selectedProject = projects.find(project => project.slug === spaceId);
  const pagePath = spaceId === "home" ? "/" : "/" + spaceUrl(spaceId);
  const pageTitle = selectedProject ? selectedProject.title + " | Gunvanth Madabattula" :
    spaceId === "wiki" ? "Architecture wiki | Gunvanth Madabattula" :
    spaceId === "home" ? undefined : "Page not found | Gunvanth Madabattula";
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const activeTheme =
    colorContexts.find((t) => t.id === activeThemeId) || colorContexts[0];

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", activeTheme.id);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", getComputedStyle(root).getPropertyValue("--pf-canvas").trim());
    if (activeTheme.mode === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
    try {
      localStorage.setItem("pf_color_context_v2", activeTheme.id);
    } catch {
      // Ignore storage errors
    }
  }, [activeTheme]);

  useEffect(() => {
    initGTM();
  }, []);

  useEffect(() => {
    trackPageView(pagePath, document.title);
  }, [pagePath]);

  useEffect(() => {
    const section = spaceId === "home" && location.hash && document.getElementById(location.hash.slice(1));
    if (section) section.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [spaceId, location.hash, location.key]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenProjectScreen = useCallback((project) => {
    const url = spaceUrl(project.slug);
    trackProjectClick(project.title, "case_study_screen", url);
    navigate(url);
  }, [navigate]);

  const handleOpenWikiScreen = useCallback(() => {
    trackNavigationClick("wiki", "view_switch");
    navigate(spaceUrl("wiki"));
  }, [navigate]);

  const handleNavigateHome = useCallback((targetSectionId) => {
    trackNavigationClick(targetSectionId || "home", "view_switch");
    navigate(spaceUrl("home", targetSectionId));
  }, [navigate]);

  const handleDownloadResume = useCallback(async () => {
    trackResumeDownload("started");
    const triggerBlobDownload = (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Gunvanth_Madabattula_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    };

    try {
      const endpoint = BACKEND_URL
        ? `${BACKEND_URL}/api/resume/download`
        : "/api/resume/download";
      const response = await fetch(endpoint);
      const contentType = response.headers.get("content-type") || "";

      if (response.ok && contentType.includes("application/pdf")) {
        const blob = await response.blob();
        triggerBlobDownload(blob);
        trackResumeDownload("success", {
          source: "api",
          filename: "Gunvanth_Madabattula_Resume.pdf"
        });
        toast({
          title: "Resume Downloaded",
          description: "Gunvanth_Madabattula_Resume.pdf (Latest 2026 Edition)"
        });
        return;
      }
    } catch {
      // Fall back to static public asset when backend is offline or hosted statically
    }

    try {
      const fallbackRes = await fetch("/Gunvanth_Madabattula_Resume.pdf");
      if (fallbackRes.ok) {
        const blob = await fallbackRes.blob();
        triggerBlobDownload(blob);
        trackResumeDownload("success", {
          source: "static",
          filename: "Gunvanth_Madabattula_Resume.pdf"
        });
        toast({
          title: "Resume Downloaded",
          description: "Gunvanth_Madabattula_Resume.pdf (Latest 2026 Edition)"
        });
        return;
      }
      trackResumeDownload("error", { error_message: "Static resume fetch failed" });
    } catch (err) {
      console.error("Resume download failed:", err);
      trackResumeDownload("error", { error_message: err?.message || "Resume download failed" });
    }

    window.open("/Gunvanth_Madabattula_Resume.pdf", "_blank");
  }, []);

  return (
    <div
      className={`App ${activeTheme.mode === "light" ? "light" : "dark"}`}
      data-theme={activeTheme.id}
      data-space-id={spaceId}
    >
      <SEO path={pagePath} title={pageTitle} description={selectedProject?.description} />
      <Header
        onOpenCommand={() => setIsCommandOpen(true)}
      />

      {/* VIEW 1: Dedicated Full-Screen Case Study & Live Motion Architecture Screen */}
      {selectedProject && (
        <CaseStudyScreen
          key={selectedProject.slug}
          project={selectedProject}
          onBack={() => handleNavigateHome("case-studies")}
          onSelectProject={handleOpenProjectScreen}
        />
      )}

      {/* VIEW 2: Dedicated Full-Screen Engineering Wiki & ADRs Screen */}
      {spaceId === "wiki" && (
        <EngineeringWiki
          isStandaloneScreen={true}
          onBack={() => handleNavigateHome("workbench")}
        />
      )}

      {/* VIEW 3: Minimal, Low-Scroll Executive Home */}
      {spaceId === "home" && (
        <main>
          <Hero onDownloadResume={handleDownloadResume} />

          <Projects />
          <Skills />

          <WorkbenchSection onOpenWikiScreen={handleOpenWikiScreen} />

          <div id="contact">
            <Contact onDownloadResume={handleDownloadResume} />
          </div>
        </main>
      )}

      {!selectedProject && spaceId !== "home" && spaceId !== "wiki" && (
        <main className="folio-wrap folio-detail">
          <ScrollReveal>
            <h1 className="detail-title">Page not found</h1>
            <Link className="folio-link" to={spaceUrl("home")}>Return to portfolio</Link>
          </ScrollReveal>
        </main>
      )}

      <Footer
        activeTheme={activeTheme}
        setActiveThemeId={setActiveThemeId}
      />

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        activeThemeId={activeThemeId}
        setActiveThemeId={setActiveThemeId}
        onDownloadResume={handleDownloadResume}
        onSelectProject={handleOpenProjectScreen}
        onOpenWikiScreen={handleOpenWikiScreen}
        onNavigateHome={handleNavigateHome}
      />

      <Toaster />
    </div>
  );
}

export default App;
