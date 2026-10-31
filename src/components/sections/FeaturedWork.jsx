import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Section from "../Section";
import ProjectImage from "../ProjectImage";
import { projects } from "../../data/portfolioData";

/* Only real URLs become links — anything else stays a non-link. */
const isHttpUrl = (url) =>
  typeof url === "string" && /^https?:\/\//i.test(url.trim());

/* Shortest signed distance from `current` to `index`, so the ring wraps in
   both directions instead of everything shifting one way. */
const ringOffset = (index, current, total) => {
  let offset = index - current;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
};

const TechChips = ({ technologies = [] }) =>
  technologies.length > 0 ? (
    <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
      {technologies.map((tech) => (
        <li key={tech}>
          <span className="badge gap-1.5">
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rounded-full bg-mint"
            />
            {tech}
          </span>
        </li>
      ))}
    </ul>
  ) : null;

/**
 * ProjectsMade
 * 3D coverflow carousel of projects. Arrow keys, arrows and dots move
 * the ring; selecting the centred card opens a details modal.
 */
const ProjectsMade = () => {
  const items = useMemo(
    () => projects.filter((project) => project && project.title),
    []
  );

  const [current, setCurrent] = useState(0);
  const [active, setActive] = useState(null);
  const [compact, setCompact] = useState(false);
  const closeButtonRef = useRef(null);
  const lastTriggerRef = useRef(null);

  /* Tighten the coverflow on small screens. */
  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const sync = () => setCompact(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const total = items.length;
  const move = useCallback(
    (step) => {
      if (total < 2) return;
      setCurrent((value) => (value + step + total) % total);
    },
    [total]
  );

  const onKeyDown = (event) => {
    if (active) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  };

  /* Modal: Escape closes, focus lands on the close button, and focus
     returns to the card that opened it. */
  useEffect(() => {
    if (!active) return;
    const onEscape = (event) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onEscape);
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = previousOverflow;
      lastTriggerRef.current?.focus?.();
    };
  }, [active]);

  if (!total) return null;

  const spacing = compact ? 148 : 300;

  return (
    <Section
      id="projects-made"
      className="relative overflow-hidden"
      background="panel"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-mint/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="eyebrow">Projects Made</p>
        <h2 className="section-title mt-1">
          Projects{" "}
          <span className="bg-mint-gradient bg-clip-text text-transparent">
            Made
          </span>
        </h2>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-gray lg:text-[1.125rem]">
          A closer look at the projects I have built. Use the arrows to browse
          and select a card to see the full details.
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative mx-auto mt-14 w-full"
        style={{ perspective: "120rem" }}
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects Made"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          className="relative h-[26rem] w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((project, index) => {
            const offset = ringOffset(index, current, total);
            const distance = Math.abs(offset);
            const isActive = distance === 0;
            const isVisible = distance <= 1;
            const scale = isActive
              ? 1
              : distance === 1
                ? compact
                  ? 0.78
                  : 0.86
                : 0.72;

            return (
              <article
                key={project.id}
                tabIndex={isActive ? 0 : -1}
                aria-label={`${project.title} project`}
                aria-hidden={!isVisible}
                onClick={(event) => {
                  if (!isVisible) return;
                  if (isActive) {
                    lastTriggerRef.current = event.currentTarget;
                    setActive(project);
                  } else {
                    setCurrent(index);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  if (isActive) {
                    lastTriggerRef.current = event.currentTarget;
                    setActive(project);
                  } else {
                    setCurrent(index);
                  }
                }}
                className={[
                  "absolute left-1/2 top-1/2 flex w-[19rem] max-w-[80vw] flex-col overflow-hidden rounded-2xl border bg-secondary-dark/95 shadow-card backdrop-blur transition-all duration-500 ease-out",
                  isActive
                    ? "cursor-pointer border-mint/50 hover:shadow-glow"
                    : "cursor-pointer border-mint/10",
                  isVisible ? "focus-visible:outline-none" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  height: "24rem",
                  transform: `translate(-50%, -50%) translateX(${offset * spacing}px) scale(${scale}) rotateY(${offset * -8}deg)`,
                  opacity: isActive ? 1 : distance === 1 ? 0.84 : 0,
                  zIndex: 20 - distance,
                  pointerEvents: isVisible ? "auto" : "none",
                  visibility: isVisible ? "visible" : "hidden",
                }}
              >
                <div className="h-40 shrink-0 overflow-hidden bg-charcoal">
                  <ProjectImage
                    title={project.title}
                    imageSrc={project.imageSrc}
                  />
                </div>

                <div className="flex min-h-0 flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.25rem] font-semibold text-off-white">
                    {project.title}
                  </h3>
                  {project.type ? (
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-gray">
                      {project.type}
                    </p>
                  ) : null}

                  <p className="mt-3 line-clamp-3 text-[1rem] leading-relaxed text-muted-gray">
                    {project.description}
                  </p>

                  <TechChips technologies={project.technologies} />
                </div>
              </article>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={total < 2}
            aria-label="Previous project"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-mint/25 bg-secondary-dark/80 text-mint transition-all duration-200 hover:-translate-y-0.5 hover:border-mint/60 hover:bg-mint/10 disabled:opacity-40"
          >
            <ArrowRight size={20} className="rotate-180" />
          </button>

          <ul
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Choose a project"
          >
            {items.map((project, index) => {
              const isActive = index === current;
              return (
                <li key={project.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show ${project.title}`}
                    onClick={() => setCurrent(index)}
                    className={[
                      "block rounded-full transition-all duration-300",
                      isActive
                        ? "h-2.5 w-6 bg-mint shadow-glow"
                        : "size-2.5 bg-mint/25 hover:bg-mint/50",
                    ].join(" ")}
                  />
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => move(1)}
            disabled={total < 2}
            aria-label="Next project"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-mint/25 bg-secondary-dark/80 text-mint transition-all duration-200 hover:-translate-y-0.5 hover:border-mint/60 hover:bg-mint/10 disabled:opacity-40"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Details modal */}
      {active ? (
        <div
          className="fixed inset-0 z-[60] grid place-items-center p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <button
            type="button"
            aria-label="Close project details"
            onClick={() => setActive(null)}
            className="absolute inset-0 h-full w-full cursor-default bg-charcoal/75 backdrop-blur-sm"
          />

          <div className="relative z-10 max-h-[85vh] w-full max-w-xl overflow-auto rounded-2xl border border-mint/15 bg-secondary-dark p-7 shadow-glow-lg">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close project details"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-mint/20 text-muted-gray transition-colors hover:border-mint/50 hover:text-mint"
            >
              <X size={16} />
            </button>

            <div className="h-44 overflow-hidden rounded-xl border border-mint/10 bg-charcoal">
              <ProjectImage title={active.title} imageSrc={active.imageSrc} />
            </div>

            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
              Project details
            </p>
            <h2
              id="project-modal-title"
              className="mt-2 font-display text-[1.75rem] font-bold text-off-white"
            >
              {active.title}
            </h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-muted-gray">
              {active.description}
            </p>

            {active.technologies?.length ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {active.technologies.map((tech) => (
                  <li key={tech}>
                    <span className="badge gap-1.5">
                      <span
                        aria-hidden="true"
                        className="size-2 shrink-0 rounded-full bg-mint"
                      />
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            {active.architecture ? (
              <p className="mt-4 text-[1rem] text-off-white">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-gray">
                  Architecture ·{" "}
                </span>
                {active.architecture}
              </p>
            ) : null}

            {isHttpUrl(active.repoUrl) || isHttpUrl(active.demoUrl) ? (
              <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-mint/10 pt-5">
                {isHttpUrl(active.repoUrl) ? (
                  <a
                    href={active.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline btn-sm"
                  >
                    <SiGithub size={14} />
                    Code
                  </a>
                ) : null}
                {isHttpUrl(active.demoUrl) ? (
                  <a
                    href={active.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-sm"
                  >
                    Live Demo
                    <ExternalLink size={14} />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </Section>
  );
};

export default ProjectsMade;
