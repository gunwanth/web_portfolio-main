import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Download, Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleDownloadResume = async () => {
    try {
      // Prefer CRA `REACT_APP_BACKEND_URL` env; fall back to relative path.
      // Using a relative path ("") lets the dev server proxy or same-origin
      // backend handle the request during development.
      const BACKEND_URL =
        (typeof process !== "undefined" && process.env && process.env.REACT_APP_BACKEND_URL) || "";

      const response = await fetch(
        `${BACKEND_URL}/api/resume/download`
      );

      if (!response.ok) {
        throw new Error("Failed to download resume");
      }

      const blob = await response.blob();
      
      // Check if we're on a mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile && navigator.share && blob.type === "application/pdf") {
        // Try native share on mobile first
        try {
          const file = new File([blob], "Gunvanth_Madabattula_Resume.pdf", { type: "application/pdf" });
          await navigator.share({
            files: [file],
            title: "Gunvanth's Resume",
          });
          return;
        } catch (shareError) {
          // User cancelled share or share not available, fall through to download
          if (shareError.name !== "AbortError") {
            console.log("Share failed, falling back to download");
          }
        }
      }
      
      // Fallback: download via blob URL
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Gunvanth_Madabattula_Resume.pdf";
      
      // Ensure the link is in the document for iOS compatibility
      document.body.appendChild(a);
      
      // Add a small delay for iOS to ensure proper handling
      setTimeout(() => {
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Error downloading resume:", error);
      alert("Failed to download resume. Please try again.");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            <span className="text-amber-400">G</span>unvanth
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              "about",
              "experience",
              "projects",
              "skills",
              "certifications",
              "contact",
            ].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-gray-300 hover:text-amber-400 transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}

            <Button
              onClick={handleDownloadResume}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            {[
              "about",
              "experience",
              "projects",
              "skills",
              "certifications",
              "contact",
            ].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block text-gray-300 hover:text-amber-400 transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}

            <Button
              onClick={handleDownloadResume}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;