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
      console.log("Downloading resume from:", url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
        },
        credentials: 'include'
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", {
        contentType: response.headers.get('content-type'),
        contentDisposition: response.headers.get('content-disposition'),
        contentLength: response.headers.get('content-length'),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const blob = await response.blob();
      console.log("Blob received - Type:", blob.type, "Size:", blob.size);
      
      // Validate that we actually got a PDF
      if (!blob.type.includes("pdf") && !blob.type.includes("application/octet-stream")) {
        console.error("Invalid blob type:", blob.type);
        console.error("First 100 chars of blob:", await blob.text().then(t => t.substring(0, 100)));
        throw new Error("Server did not return a PDF file. Received: " + blob.type);
      }
      
      // Check if we're on a mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile && navigator.share && blob.type.includes("pdf")) {
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
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = "Gunvanth_Madabattula_Resume.pdf";
      
      // Ensure the link is in the document for iOS compatibility
      document.body.appendChild(a);
      
      // Add a small delay for iOS to ensure proper handling
      setTimeout(() => {
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(objectUrl);
      }, 100);
    } catch (error) {
      console.error("Error downloading resume:", error);
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