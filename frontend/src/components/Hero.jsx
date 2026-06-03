import React from 'react';
import { Button } from './ui/button';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { personalInfo } from '../data/mock';
import Antigravity from './Antigravity';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-90">
        <Antigravity
          count={300}
          magnetRadius={10}
          ringRadius={7}
          waveSpeed={0.7}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#7C3AED"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-black/65"></div>
      <div className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-black to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center">
          <div className="mb-6 animate-fade-in">
            <span className="text-amber-300 font-semibold text-lg">Hello, I'm</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            {personalInfo.name}
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-light text-slate-200 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {personalInfo.title}
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {personalInfo.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-6 text-lg transition-transform hover:scale-105"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
            <Button
              onClick={() => scrollToSection('projects')}
              size="lg"
              variant="outline"
              className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900 px-8 py-6 text-lg transition-transform hover:scale-105"
            >
              View My Work
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-400 transition-all hover:scale-110"
            >
              <Github className="w-7 h-7" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-400 transition-all hover:scale-110"
            >
              <Linkedin className="w-7 h-7" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-gray-400 hover:text-amber-400 transition-all hover:scale-110"
            >
              <Mail className="w-7 h-7" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-amber-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
