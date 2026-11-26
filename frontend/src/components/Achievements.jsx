import React from "react";
import {
  Trophy,
  Server,
  Users,
  Cloud,
  TrendingUp,
  Cpu
} from "lucide-react";
import { achievements } from "../data/mock";

const getAchievementIcon = (index) => {
  const icons = [
    <Server className="w-5 h-5" />,
    <Users className="w-5 h-5" />,
    <Cloud className="w-5 h-5" />,
    <TrendingUp className="w-5 h-5" />,
    <Cpu className="w-5 h-5" />,
    <Trophy className="w-5 h-5" />
  ];
  return icons[index % icons.length];
};

const Achievements = () => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, index) => {
            const isObject = typeof item === "object" && item !== null;
            const title = isObject ? item.title : `Milestone #${index + 1}`;
            const category = isObject ? item.category : "Achievement";
            const description = isObject ? item.description : item;

            return (
              <div key={isObject ? item.id : index} className="pf-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="p-2.5 rounded-xl pf-badge-accent">
                      {getAchievementIcon(index)}
                    </div>
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider"
                      style={{ color: "var(--pf-text-muted)" }}
                    >
                      {category}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold mb-2">
                    {title}
                  </h3>

                  <p
                    className="text-xs sm:text-sm leading-relaxed"
                    style={{ color: "var(--pf-text-secondary)" }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
