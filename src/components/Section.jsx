import React from "react";

/**
 * Section
 * Shared wrapper that keeps spacing and width consistent across the page.
 * background: "base" (page gradient shows through) | "panel" (subtle band)
 */
const Section = ({ id, background = "base", className = "", style, children }) => {
  const backgroundClass =
    background === "panel" ? "border-y border-mint/10 bg-secondary-dark/40" : "";

  return (
    <section
      id={id}
      className={`px-4 py-20 sm:px-6 md:py-28 lg:px-8 ${backgroundClass} ${className}`}
      style={style}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
};

export default Section;
