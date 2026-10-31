import React from "react";
import { Laptop } from "lucide-react";
import Section from "../Section";
import { skills } from "../../data/portfolioData";

/**
 * Skills
 * Unified "Skills & Abilities" grid of individual skill cards.
 * Add or remove entries in portfolioData.js — no code changes needed.
 */
const Skills = () => {
  return (
    <Section id="skills" background="panel">
      <div className="mb-14 text-center">
        <p className="eyebrow">Skills</p>
        <h2 className="section-title flex items-center justify-center gap-3">
          <Laptop
            aria-hidden="true"
            className="h-6 w-6 shrink-0 text-deep-mint sm:h-7 sm:w-7"
            strokeWidth={1.75}
          />
          Skills &amp; Abilities
        </h2>
        <p className="section-lead mt-4">{skills.note}</p>
      </div>

      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
        {skills.list.map(({ name, icon: Icon, color }) => (
          <li key={name} className="min-w-0">
            <div
              aria-label={name}
              className="group flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-secondary-dark p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-deep-mint/60 hover:shadow-glow"
            >
              <Icon
                aria-hidden="true"
                className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ color }}
              />
              <span className="w-full truncate text-center text-sm font-medium text-off-white">
                {name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Skills;
