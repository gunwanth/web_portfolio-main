import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Download, Menu, X } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleDownloadResume = async () => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/resume/download`);
      
      if (!response.ok) {
        throw new Error('Failed to download resume');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Gunvanth_Madabattula_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            <span className="text-amber-400">G</span>unvanth
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-amber-400 transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('experience')} className="text-gray-300 hover:text-amber-400 transition-colors">
              Experience
            </button>
            <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-amber-400 transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection('skills')} className="text-gray-300 hover:text-amber-400 transition-colors">
              Skills
            </button>
            <button onClick={() => scrollToSection('certifications')} className="text-gray-300 hover:text-amber-400 transition-colors">
              Certifications
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-amber-400 transition-colors">
              Contact
            </button>
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
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            <button onClick={() => scrollToSection('about')} className="block text-gray-300 hover:text-amber-400 transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('experience')} className="block text-gray-300 hover:text-amber-400 transition-colors">
              Experience
            </button>
            <button onClick={() => scrollToSection('projects')} className="block text-gray-300 hover:text-amber-400 transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection('skills')} className="block text-gray-300 hover:text-amber-400 transition-colors">
              Skills
            </button>
            <button onClick={() => scrollToSection('certifications')} className="block text-gray-300 hover:text-amber-400 transition-colors">
              Certifications
            </button>
            <button onClick={() => scrollToSection('contact')} className="block text-gray-300 hover:text-amber-400 transition-colors">
              Contact
            </button>
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
