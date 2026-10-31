import React from "react";
import { Sparkles } from "lucide-react";
import Section from "../Section";
import { services } from "../../data/portfolioData";
import ServiceCard from "../ServiceCard";

const Services = () => {
  return (
    <Section
      id="services"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(1200px circle at top, rgba(20, 184, 166, 0.08), transparent 60%), radial-gradient(900px circle at bottom, rgba(34, 211, 238, 0.06), transparent 55%)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent" />

      <div className="relative mb-14 text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">
          <Sparkles size={12} />
          Services
        </p>
        <h2 className="font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
          <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
            What I Can Do For You
          </span>
        </h2>
        <p className="section-lead mt-4 mx-auto max-w-2xl text-slate-300">
          Crafting modern web solutions with a focus on performance, scalability,
          and clean user experiences.
        </p>
      </div>

      <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            index={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
            features={service.features}
          />
        ))}
      </div>
    </Section>
  );
};

export default Services;
