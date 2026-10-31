import React from "react";
import { Briefcase, CheckCircle, Code2, MapPin } from "lucide-react";
import Section from "../Section";
import { about } from "../../data/portfolioData";

const quickFacts = [
  {
    icon: MapPin,
    label: "Location",
    value: "Yangon, Myanmar",
  },
  {
    icon: Code2,
    label: "Focus",
    value: "Full Stack Development",
  },
  {
    icon: Briefcase,
    label: "Currently",
    value: "ITVisionHub Co., Ltd.",
  },
  {
    icon: CheckCircle,
    label: "Availability",
    value: "Open to new opportunities",
  },
];

/**
 * AboutMe
 * Two-column layout: narrative on the left, quick-facts card on the right.
 */
const AboutMe = () => {
  return (
    <Section id="about">
      <div className="grid items-start gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        {/* Narrative */}
        <div className="min-w-0 animate-fade-up">
          <p className="eyebrow">About</p>
          <h2 className="section-title mt-1">About Me</h2>

          <p
            className="mt-6 text-pretty text-xl leading-relaxed text-off-white/90 sm:text-2xl [&_strong]:font-semibold [&_strong]:text-off-white"
            dangerouslySetInnerHTML={{ __html: about.lead }}
          />

          {about.role && (
            <p className="mt-2 text-lg font-semibold tracking-tight text-mint sm:text-xl">
              {about.role}
            </p>
          )}

          <div className="mt-7 space-y-5">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-pretty text-[1.0625rem] leading-[1.75] text-muted-gray [&_strong]:font-semibold [&_strong]:text-off-white"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>

        {/* Quick facts */}
        <div
          className="w-full animate-fade-up lg:mt-28"
          style={{ animationDelay: "120ms" }}
        >
          <div className="panel p-6 lg:p-7">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-gray">
              Quick facts
            </p>
            <dl className="mt-5 divide-y divide-white/10">
              {quickFacts.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3.5 py-4 first:pt-0 last:pb-0"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-mint/10 text-mint">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <dt className="text-xs uppercase tracking-wide text-muted-gray">
                      {label}
                    </dt>
                    <dd className="mt-0.5 text-[1.0625rem] font-medium leading-snug text-off-white">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutMe;
