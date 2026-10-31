import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import Section from "../Section";
import { experience } from "../../data/portfolioData";

/**
 * Experience
 * Shows professional experience.
 */
const Experience = () => {
  if (!experience || experience.length === 0) return null;

  return (
    <Section id="experience" background="panel">
      <div className="mb-14 text-center">
        <p className="eyebrow">Experience</p>
        <h2 className="section-title flex items-center justify-center gap-3">
          <Briefcase
            aria-hidden="true"
            className="h-6 w-6 shrink-0 text-deep-mint sm:h-7 sm:w-7"
            strokeWidth={1.75}
          />
          My Experience
        </h2>
        <p className="section-lead mt-4">Where I am putting my skills to work.</p>
      </div>

      <div className="mx-auto max-w-3xl space-y-6">
        {experience.map((item) => (
          <article
            key={item.id}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-secondary-dark p-6 transition-all duration-300 hover:-translate-y-1 hover:border-deep-mint/60 hover:shadow-glow sm:p-7"
          >
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-deep-mint/5 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-start">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mint-gradient text-charcoal shadow-[0_25px_60px_-30px_rgba(94,234,212,0.9)]">
                <Briefcase size={22} />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-lg font-semibold text-off-white sm:text-xl">
                    {item.role}
                  </h3>
                  {item.type && (
                    <span className="rounded-full border border-deep-mint/40 bg-deep-mint/10 px-3 py-0.5 text-xs font-medium text-deep-mint">
                      {item.type}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-base font-medium text-deep-mint">
                  {item.company}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-gray">
                  {item.period && (
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={14} className="text-deep-mint" />
                      {item.period}
                    </span>
                  )}
                  {item.location && (
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={14} className="text-deep-mint" />
                      {item.location}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="mt-4 text-pretty leading-relaxed text-muted-gray">
                    {item.description}
                  </p>
                )}
                {item.technologies && item.technologies.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-off-white/80 transition-colors duration-300 hover:border-deep-mint/40 hover:text-off-white"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Experience;
