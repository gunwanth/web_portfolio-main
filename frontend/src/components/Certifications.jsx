import React from 'react';
import { Card } from './ui/card';
import { Award, CheckCircle2 } from 'lucide-react';
import { certifications } from '../data/mock';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Certifications</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Continuous learning and professional development
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Card
              key={cert.id}
              className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 group border-l-4 border-amber-500"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-900 mb-2 leading-tight">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-amber-600 font-medium mb-1">{cert.provider}</p>
                  <p className="text-xs text-gray-500">{cert.year}</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
