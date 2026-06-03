import React from 'react';
import { Card } from './ui/card';
import { Award, CheckCircle2 } from 'lucide-react';
import { certifications } from '../data/mock';

const Certifications = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Card
              key={cert.id}
              className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 group border-l-4 border-amber-500 bg-black border-slate-800"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-white mb-2 leading-tight">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-amber-600 font-medium mb-1">{cert.provider}</p>
                  <p className="text-xs text-slate-400">{cert.year}</p>
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
