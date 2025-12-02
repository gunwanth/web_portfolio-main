import React from 'react';
import { Card } from './ui/card';
import { GraduationCap, MapPin, Languages } from 'lucide-react';
import { personalInfo, education } from '../data/mock';

const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {personalInfo.about}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span className="text-gray-700">{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-amber-500" />
                <span className="text-gray-700">English, Hindi, Telugu</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-amber-500" />
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <Card key={edu.id} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-amber-500">
                  <h4 className="font-semibold text-lg text-slate-900 mb-2">{edu.degree}</h4>
                  <p className="text-amber-600 font-medium mb-1">{edu.institution}</p>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{edu.period}</span>
                    <span className="font-semibold text-slate-900">{edu.grade}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
