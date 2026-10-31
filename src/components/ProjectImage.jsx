import React from "react";

/**
 * getInitials
 * Two-letter mark used when a project has no screenshot yet.
 */
const getInitials = (title = "") =>
  title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

/**
 * ProjectImage
 * Renders a real screenshot when one exists, otherwise a styled
 * initials placeholder so cards always look complete.
 */
const ProjectImage = ({ title, imageSrc }) => {
  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={`${title} screenshot`}
        loading="lazy"
        draggable="false"
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-secondary-dark">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(101,214,173,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(101,214,173,0.35) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-mint/15 via-transparent to-deep-mint/15"
      />
      <div className="relative grid size-16 place-items-center rounded-2xl border border-mint/20 bg-charcoal/70 backdrop-blur">
        <span className="bg-mint-gradient bg-clip-text text-xl font-extrabold text-transparent">
          {getInitials(title)}
        </span>
      </div>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-muted-gray/70">
        screenshot placeholder
      </span>
    </div>
  );
};

export default ProjectImage;
