import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Mail, MapPin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Button from "../Button";
import { hero, profile } from "../../data/portfolioData";

const TECH_CHIPS = [
  {
    label: "React",
    dot: "bg-mint",
    position: "left-[-1.1rem] top-16",
    delay: "0s",
  },
  {
    label: "Vite",
    dot: "bg-deep-mint",
    position: "right-[-1.4rem] top-1/3",
    delay: "1.2s",
  },
  {
    label: "Tailwind",
    dot: "bg-soft-mint",
    position: "left-[-1.4rem] bottom-28",
    delay: "2.1s",
  },
];

/* The animated introduction, in order. Each entry carries its own stagger. */
const INTRO_LINES = [
  {
    id: "greeting",
    text: hero.greeting,
    kind: "eyebrow",
    animation: "animate-hero-blur",
    delay: 0.1,
  },
  {
    id: "name",
    text: hero.name,
    kind: "name",
    animation: "animate-hero-in",
    delay: 0.5,
  },
].filter((line) => Boolean(line.text));

const TONE = {
  eyebrow:
    "text-xl font-semibold tracking-tight text-off-white sm:text-2xl",
  name: "mt-2.5 font-display text-[2.5rem] font-extrabold leading-[1.06] tracking-tight text-off-white sm:text-5xl lg:text-6xl xl:text-[4.25rem]",
  role: "relative mt-2 text-[1.375rem] font-bold tracking-tight text-muted-gray sm:text-3xl lg:text-[2.25rem] xl:text-[2.5rem]",
};

/* Split a line so `highlight` gets the gradient while the rest stays solid. */
function splitHighlight(text, highlight) {
  if (!highlight || !text.includes(highlight)) return [text, ""];
  return text.split(highlight);
}

/* One animated intro line. The moving parts sit on an inner element so a
   line can never overlap the next one while it drifts up. */
function IntroLine({ line }) {
  const [before, after] = splitHighlight(line.text, hero.nameHighlight);
  const highlight =
    line.kind === "name" && before !== line.text ? hero.nameHighlight : "";

  return (
    <span
      className={`hero-line block ${line.animation} ${TONE[line.kind]}`}
      style={{ "--hero-delay": `${line.delay}s` }}
    >
      <span className="inline-block">
        {before}
        {highlight ? (
          <span className="bg-mint-gradient bg-clip-text text-transparent">
            {highlight}
          </span>
        ) : null}
        {after}
      </span>
    </span>
  );
}

/* Types the role phrases out one letter at a time, holds, deletes and moves
   on. With `prefers-reduced-motion` the loop never starts: the first phrase
   is simply shown, static. */
function TypedLine({ phrases, delay }) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  /* Wait for the other hero lines to finish before typing begins. */
  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setStarted(true), delay * 1000);
    return () => window.clearTimeout(id);
  }, [delay, reduced]);

  useEffect(() => {
    if (reduced || !started) return;

    const phrase = phrases[index % phrases.length];
    let wait;

    if (!deleting && shown === phrase) {
      wait = 1400; // hold the finished word
    } else if (deleting && shown === "") {
      wait = 260; // pause on empty, then type the next one
    } else {
      wait = deleting ? 45 : 85;
    }

    const id = window.setTimeout(() => {
      if (!deleting && shown === phrase) {
        setDeleting(true);
      } else if (deleting && shown === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        setShown(phrase.slice(0, shown.length + (deleting ? -1 : 1)));
      }
    }, wait);

    return () => window.clearTimeout(id);
  }, [phrases, index, shown, deleting, started, reduced]);

  const text = reduced ? phrases[0] : shown;

  return (
    <span
      className={`hero-line block ${TONE.role}`}
      style={{ "--hero-delay": `${delay}s` }}
    >
      {/* The visible copy is decorative; the h1's aria-label carries the
          stable, unchanging text for screen readers. */}
      <span aria-hidden="true" className="relative inline-block">
        <span className="bg-mint-gradient bg-clip-text text-transparent">
          {text}
        </span>
        {reduced ? null : (
          <span
            aria-hidden="true"
            className="typed-caret animate-caret-blink ml-0.5 inline-block w-[0.08em] bg-mint align-baseline"
          />
        )}
      </span>
    </span>
  );
}

function FloatingChip({ label, dot, position, delay }) {
  return (
    <span
      style={{ animationDelay: delay }}
      className={`absolute hidden animate-float items-center gap-2 rounded-xl border border-mint/15 bg-secondary-dark/90 px-3 py-2 text-xs font-medium text-off-white shadow-card backdrop-blur sm:inline-flex ${position}`}
    >
      <span className={`size-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function AvatarPlaceholder({ initials }) {
  return (
    <div className="bg-grid grid aspect-[4/5] w-full place-items-center">
      <div className="relative grid size-40 place-items-center rounded-full border border-mint/25 bg-secondary-dark/50 backdrop-blur-sm sm:size-44">
        <div className="absolute inset-0 rounded-full bg-mint-gradient opacity-25 blur-lg" />
        <span className="relative bg-mint-gradient bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
          {initials}
        </span>
        <span className="absolute -bottom-3 rounded-full border border-mint/15 bg-charcoal/85 px-3 py-1 font-mono text-[10px] text-muted-gray backdrop-blur">
          add your photo
        </span>
      </div>
    </div>
  );
}

/**
 * Hero
 * First screen: animated greeting/name, typed role, actions, social and
 * contact details, and a framed portrait with floating tech chips.
 */
const Hero = () => {
  /* If the profile photo is missing, fall back to the initials placeholder. */
  const [photoFailed, setPhotoFailed] = useState(false);

  const initials = profile.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <section
      id="home"
      className="relative overflow-hidden lg:flex lg:min-h-[calc(100svh-4.5rem)] lg:items-center"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="hero-shade absolute inset-0" />
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,#000_0%,#000_62%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-32 size-80 animate-pulse-glow rounded-full bg-deep-mint/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 right-0 size-96 animate-pulse-glow rounded-full bg-mint/15 blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 xl:gap-20">
          {/* ---------------- Left: copy ---------------- */}
          <div className="min-w-0 max-w-3xl">
            <h1
              aria-label={[
                ...INTRO_LINES.map((line) => line.text),
                hero.role,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {INTRO_LINES.map((line) => (
                <IntroLine key={line.id} line={line} />
              ))}
              {hero.typed?.length ? (
                <TypedLine phrases={hero.typed} delay={1.25} />
              ) : null}
            </h1>

            <div
              className="mt-9 flex animate-fade-up flex-wrap items-center gap-3"
              style={{ animationDelay: "0.45s" }}
            >
              <Button
                href="#projects"
                className="group px-6 py-3 text-sm"
              >
                View My Projects
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
              <Button
                href="#contact"
                variant="outline"
                className="px-6 py-3 text-sm"
              >
                Contact Me
              </Button>
            </div>

            <div
              className="mt-10 flex animate-fade-up flex-wrap items-center gap-x-5 gap-y-4"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-center gap-2.5">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  aria-label="GitHub profile"
                >
                  <SiGithub size={17} />
                </a>
              </div>

              <span
                aria-hidden="true"
                className="hidden h-6 w-px bg-mint/15 sm:block"
              />

              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 text-sm text-muted-gray transition-colors hover:text-off-white"
              >
                <Mail size={16} className="text-deep-mint" />
                {profile.email}
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm text-muted-gray transition-colors hover:text-off-white"
              >
                <MapPin size={16} className="text-mint" />
                {profile.location}
              </a>
            </div>
          </div>

          {/* ---------------- Right: profile ---------------- */}
          <div
            className="relative mx-auto w-full max-w-[22rem] animate-fade-up sm:max-w-sm lg:max-w-[24rem] lg:justify-self-end"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-mint/25 via-transparent to-deep-mint/25 blur-2xl"
              />

              <div className="relative rounded-[1.75rem] border border-mint/20 bg-secondary-dark/80 p-3 shadow-glow-lg backdrop-blur">
                <div className="relative overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-secondary-dark to-charcoal">
                  {!photoFailed ? (
                    <img
                      src={profile.imageSrc}
                      alt={`Portrait of ${profile.name}`}
                      className="block aspect-[4/5] w-full object-cover object-top"
                      onError={() => setPhotoFailed(true)}
                    />
                  ) : (
                    <AvatarPlaceholder initials={initials} />
                  )}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent"
                  />

                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-mint/15 bg-charcoal/70 px-4 py-3 backdrop-blur">
                    <p className="min-w-0 truncate text-sm font-semibold text-off-white">
                      {profile.name}
                    </p>
                  </div>
                </div>
              </div>

              {TECH_CHIPS.map((chip) => (
                <FloatingChip key={chip.label} {...chip} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:inline-flex"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-gray/70 transition-colors group-hover:text-muted-gray">
          Scroll
        </span>
        <span className="grid size-8 place-items-center rounded-full border border-mint/20 text-muted-gray transition-colors group-hover:border-mint/60 group-hover:text-off-white">
          <ArrowDown size={16} className="animate-float" />
        </span>
      </a>
    </section>
  );
};

export default Hero;
