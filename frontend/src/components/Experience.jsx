import React from 'react';
import { Card } from './ui/card';
import { Briefcase } from 'lucide-react';
import { experiences } from '../data/mock';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Experience</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-amber-200"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full border-4 border-white shadow-lg z-10"></div>

                <div className={`w-full md:w-5/12 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-t-4 border-amber-500">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-amber-100 rounded-lg">
                        <Briefcase className="w-6 h-6 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{exp.title}</h3>
                        <p className="text-amber-600 font-semibold mb-2">{exp.company}</p>
                        <p className="text-sm text-gray-500 mb-3">{exp.period}</p>
                        <p className="text-gray-700">{exp.description}</p>
                        {exp.type === 'internship' && (
                          <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            Internship
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
