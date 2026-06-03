import React from 'react';
import { Card } from './ui/card';
import { GraduationCap, MapPin, Languages } from 'lucide-react';
import { personalInfo, education } from '../data/mock';

const About = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              {personalInfo.about}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span className="text-slate-300">{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-amber-500" />
                <span className="text-slate-300">English, Hindi, Telugu</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-amber-500" />
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <Card key={edu.id} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-amber-500 bg-black border-slate-800">
                  <h4 className="font-semibold text-lg text-white mb-2">{edu.degree}</h4>
                  <p className="text-amber-600 font-medium mb-1">{edu.institution}</p>
                  <div className="flex justify-between items-center text-sm text-slate-400">
                    <span>{edu.period}</span>
                    <span className="font-semibold text-slate-100">{edu.grade}</span>
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
