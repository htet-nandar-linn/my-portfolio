import React from "react";
import { ArrowUpRight, FolderGit2 } from "lucide-react";

/**
 * WorkCard
 * Card used by the FeaturedWork carousel. Styled with a scoped
 * emerald/turquoise palette so it never affects other cards.
 */
const WorkCard = ({ index, title, description, technologies = [], isActive }) => {
  const label = String(index + 1).padStart(2, "0");

  return (
    <article
      aria-roledescription="slide"
      aria-label={`${label} — ${title}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-gradient-to-b from-slate-900/95 to-slate-950 transition-all duration-500 ${
        isActive
          ? "border-emerald-400/60 shadow-[0_30px_80px_-40px_rgba(16,185,129,0.55)] md:scale-[1.02]"
          : "border-emerald-400/15 opacity-80 hover:border-emerald-400/35 hover:opacity-100"
      }`}
    >
      {/* Gradient card header */}
      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-emerald-500/25 via-slate-900 to-teal-400/20 sm:h-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(45,212,191,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.35) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-2 right-5 font-display text-6xl font-bold text-emerald-300/20 sm:text-7xl"
        >
          {label}
        </span>
        <span className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/30 bg-slate-950/60 text-emerald-300 backdrop-blur">
          <FolderGit2 size={20} />
        </span>
        <span className="absolute bottom-6 left-6 rounded-full border border-emerald-400/30 bg-slate-950/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300 backdrop-blur">
          Project
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-lg font-semibold text-white transition-colors duration-300 group-hover:text-emerald-300 sm:text-xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400 line-clamp-4">
          {description}
        </p>

        {technologies.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-emerald-400/25 bg-emerald-400/5 px-3 py-1 text-xs font-medium text-emerald-200/90 transition-colors duration-300 group-hover:border-emerald-400/40"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <a
          href="#projects"
          className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-emerald-300 transition-colors duration-300 hover:text-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          View project details
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
};

export default WorkCard;
