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
      const BACKEND_URL =
        (typeof process !== "undefined" && process.env && process.env.REACT_APP_BACKEND_URL) || "";

      const url = `${BACKEND_URL}/api/resume/download`;
      console.log("Downloading from:", url);

      const response = await fetch(url);

      console.log("Response status:", response.status);
      console.log("Content-Type:", response.headers.get('content-type'));

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Server returned ${response.status}`);
      }

      const blob = await response.blob();
      console.log("Received blob:", { type: blob.type, size: blob.size });

      // Check blob type
      if (!blob.type.includes("pdf")) {
        const text = await blob.text();
        console.error("Not a PDF, received:", text.substring(0, 200));
        throw new Error("Server returned: " + blob.type);
      }
      
      // Download
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = "Gunvanth_Madabattula_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(objectUrl);
      
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download resume: " + error.message);
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