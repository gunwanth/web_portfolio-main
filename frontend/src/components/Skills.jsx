import React from 'react';
import { Card } from './ui/card';
import { Code, Database, Wrench, Sparkles } from 'lucide-react';
import { skills } from '../data/mock';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="w-6 h-6" />,
      skills: skills.programming,
      color: "amber"
    },
    {
      title: "Data Science & AI",
      icon: <Sparkles className="w-6 h-6" />,
      skills: skills.dataScience,
      color: "blue"
    },
    {
      title: "Frameworks & Libraries",
      icon: <Database className="w-6 h-6" />,
      skills: skills.frameworks,
      color: "green"
    },
    {
      title: "Tools & Technologies",
      icon: <Wrench className="w-6 h-6" />,
      skills: skills.tools,
      color: "purple"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      amber: "bg-amber-100 text-amber-600 border-amber-200",
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      green: "bg-green-100 text-green-600 border-green-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200"
    };
    return colors[color];
  };

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            A comprehensive toolkit for building intelligent solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-t-4 border-amber-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${getColorClasses(category.color)}`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-amber-100 hover:text-amber-700 hover:scale-105 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-8">
          <Card className="p-6 border-t-4 border-amber-500">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Other Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.other.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 text-slate-700 font-medium rounded-lg hover:from-amber-100 hover:to-orange-100 hover:scale-105 transition-all cursor-default border border-amber-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
