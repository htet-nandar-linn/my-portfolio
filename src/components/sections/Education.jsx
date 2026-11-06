
import React from "react";
import { Calendar, GraduationCap, MapPin } from "lucide-react";
import Section from "../Section";
import { education } from "../../data/portfolioData";

const Education = () => {
  const universityImage = `${import.meta.env.BASE_URL}images/uni.jpg`;

  return (
    <Section id="education">
      <div
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage: `url("${universityImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark background overlay */}
        <div className="absolute inset-0 -z-10 bg-slate-950/80" />

        {/* Education content */}
        <div className="relative z-10 py-12 sm:py-16">

          <div className="mb-14 text-center">
            <p className="eyebrow">Education</p>

            <h2 className="section-title flex items-center justify-center gap-3">
              <GraduationCap
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-deep-mint sm:h-7 sm:w-7"
                strokeWidth={1.75}
              />
              Academic background
            </h2>

            <p className="section-lead mt-4">
              Where I'm building my foundation in computer science.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            {education.map((entry) => (
              <article
                key={entry.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-secondary-dark/90 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-deep-mint/60 hover:shadow-glow sm:p-7"
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-deep-mint/5 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">

                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mint-gradient text-charcoal shadow-[0_25px_60px_-30px_rgba(94,234,212,0.9)]">
                    <GraduationCap size={22} />
                  </span>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-lg font-semibold text-off-white sm:text-xl">
                        {entry.degree}
                      </h3>

                      {entry.status && (
                        <span className="rounded-full border border-deep-mint/40 bg-deep-mint/10 px-3 py-0.5 text-xs font-medium text-deep-mint">
                          {entry.status}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-base font-medium text-deep-mint">
                      {entry.institution}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-gray">
                      <span className="inline-flex items-center gap-2">
                        <MapPin size={14} className="text-deep-mint" />
                        {entry.location}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <Calendar size={14} className="text-deep-mint" />
                        {entry.period}
                      </span>
                    </div>
                  </div>

                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </Section>
  );
};

export default Education;
