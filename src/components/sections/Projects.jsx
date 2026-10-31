import React from "react";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Section from "../Section";
import ProjectImage from "../ProjectImage";
import { profile, projects } from "../../data/portfolioData";

/* Only real URLs become links — anything else stays a non-link. */
const isHttpUrl = (url) =>
  typeof url === "string" && /^https?:\/\//i.test(url.trim());

const FeaturedProjectCard = ({ project, index }) => {
  const hasRepo = isHttpUrl(project.repoUrl);
  const hasDemo = isHttpUrl(project.demoUrl);

  return (
    <article className="card group flex h-full flex-col">
      {/* Screenshot */}
      <div className="relative m-3 overflow-hidden rounded-xl border border-mint/10 bg-secondary-dark">
        <div className="aspect-video">
          <ProjectImage title={project.title} imageSrc={project.imageSrc} />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-6 pt-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.375rem] font-semibold leading-snug text-off-white transition-colors group-hover:text-mint">
            {project.title}
          </h3>
          <span className="mt-0.5 font-mono text-[0.8125rem] text-muted-gray/70">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {project.type ? (
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-gray">
            {project.type}
          </p>
        ) : null}

        <p className="mt-3 text-[1rem] leading-relaxed text-muted-gray">
          {project.description}
        </p>

        {/* Tech stack + architecture */}
        <div className="mt-5 space-y-3">
          {project.technologies?.length ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-gray/80">
                Tech stack
              </span>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech}>
                    <span className="badge gap-2">
                      <span
                        aria-hidden="true"
                        className="size-2 shrink-0 rounded-full bg-mint"
                      />
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.architecture ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-gray/80">
                Architecture
              </span>
              <span className="text-[1rem] font-medium text-off-white">
                {project.architecture}
              </span>
            </div>
          ) : null}
        </div>

        {/* Links — only shown once a real URL is provided */}
        {hasRepo || hasDemo ? (
          <div className="mt-auto flex flex-wrap items-center gap-2.5 border-t border-mint/10 pt-6">
            {hasRepo ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline btn-sm"
              >
                <SiGithub size={14} />
                Code
              </a>
            ) : null}

            {hasDemo ? (
              <a
                href={project.demoUrl}
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
    </article>
  );
};

/**
 * Projects
 * "Featured Projects" grid: screenshot, title, type, description,
 * tech stack, architecture, and links when available.
 */
const Projects = () => {
  return (
    <Section id="projects">
      <div className="max-w-2xl">
        <p className="eyebrow">Projects</p>
        <h2 className="section-title mt-1">Featured Projects</h2>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-gray lg:text-[1.125rem]">
          Projects I've built while learning — from PHP and MySQL applications
          to React and Next.js interfaces. Each one focuses on clean structure,
          responsive design, and solving a practical problem.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <FeaturedProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:justify-end">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline btn-sm group"
        >
          <SiGithub size={16} />
          More on GitHub
        </a>
      </div>
    </Section>
  );
};

export default Projects;
