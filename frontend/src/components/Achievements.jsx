import React from 'react';
import { Card } from './ui/card';
import { CheckCircle2, Trophy } from 'lucide-react';
import { achievements } from '../data/mock';

const Achievements = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">


        <Card className="p-6 md:p-8 border-t-4 border-amber-500 bg-black border-slate-800">
          <div className="grid md:grid-cols-2 gap-5">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  {index === 0 ? (
                    <Trophy className="w-5 h-5 text-amber-600" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-amber-600" />
                  )}
                </div>
                <p className="text-slate-300 leading-relaxed">{achievement}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Achievements;
