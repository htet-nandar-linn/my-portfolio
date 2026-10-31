import React from "react";
import { Code2, Layers, Layout, Sparkles } from "lucide-react";

const iconMap = {
  code: Code2,
  layers: Layers,
  layout: Layout,
};

const ServiceCard = ({ index = 0, title, description, icon = "code", features = [] }) => {
  const label = String(index + 1).padStart(2, "0");
  const Icon = iconMap[icon] || Code2;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-teal-400/20 bg-gradient-to-b from-slate-900/80 to-slate-950/90 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_40px_80px_-40px_rgba(34,211,238,0.4)]">
      <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-gradient-to-br from-teal-400/10 to-cyan-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-400/20 to-cyan-400/10 text-cyan-400 shadow-[0_25px_60px_-30px_rgba(34,211,238,0.9)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_30px_70px_-25px_rgba(34,211,238,0.9)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <Icon size={26} className="relative" />
          </span>
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-cyan-400">
            {label}
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold text-off-white transition-colors duration-300 group-hover:text-cyan-400 sm:text-2xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          {description}
        </p>

        {features.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/5 px-3 py-1 text-xs text-slate-200 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-200"
              >
                <Sparkles size={12} className="text-cyan-400" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
};

export default ServiceCard;
