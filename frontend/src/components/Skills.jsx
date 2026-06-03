import React from 'react';
import { Card } from './ui/card';
import { Cloud, Code, Database, LineChart, Server, Sparkles } from 'lucide-react';
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
      title: "Frontend",
      icon: <Code className="w-6 h-6" />,
      skills: skills.frontend,
      color: "green"
    },
    {
      title: "Backend",
      icon: <Server className="w-6 h-6" />,
      skills: skills.backend,
      color: "purple"
    },
    {
      title: "Databases",
      icon: <Database className="w-6 h-6" />,
      skills: skills.databases,
      color: "teal"
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6" />,
      skills: skills.cloudDevOps,
      color: "indigo"
    },
    {
      title: "Data Analytics",
      icon: <LineChart className="w-6 h-6" />,
      skills: skills.dataAnalytics,
      color: "green"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      amber: "bg-amber-100 text-amber-600 border-amber-200",
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      green: "bg-green-100 text-green-600 border-green-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      teal: "bg-teal-100 text-teal-600 border-teal-200",
      indigo: "bg-indigo-100 text-indigo-600 border-indigo-200"
    };
    return colors[color];
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">


        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-t-4 border-amber-500 bg-black border-slate-800"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${getColorClasses(category.color)}`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-slate-800 text-slate-300 font-medium rounded-lg hover:bg-amber-500/20 hover:text-amber-200 hover:scale-105 transition-all cursor-default"
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
          <Card className="p-6 border-t-4 border-amber-500 bg-black border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4">Current Areas of Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {skills.other.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-medium rounded-lg hover:bg-amber-500/20 hover:text-amber-200 hover:scale-105 transition-all cursor-default border border-slate-700"
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
