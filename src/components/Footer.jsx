
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  ChevronRight,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { navLinks, profile, socialLinks } from "../data/portfolioData";

const Footer = () => {
  // Find GitHub link from portfolioData.js
  const github = socialLinks.find(
    (link) => link.icon === "github"
  );

  return (
    <footer className="border-t border-mint/10 bg-secondary-dark">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Three-column footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">

          {/* Column 1: About Me */}
          <div>
            <h3 className="font-display text-xl font-bold text-off-white">
              {profile.name}
            </h3>

            <p className="mt-2 text-sm font-medium text-mint">
              {profile.title}
            </p>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-gray">
              Thank you for visiting my portfolio website!
              I'm a Full Stack Developer passionate about
              building responsive web applications and creating
              meaningful digital experiences.
              Let's connect and work together!
            </p>

            <p className="mt-5 text-sm font-medium text-mint">
              Keep Learning & Keep Building 🚀
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <nav aria-label="Footer quick links">
            <h3 className="mb-5 font-display text-xl font-semibold text-off-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-muted-gray transition-colors duration-200 hover:text-mint"
                  >
                    <ChevronRight
                      size={15}
                      className="text-mint transition-transform duration-200 group-hover:translate-x-1"
                    />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}

              {/* Projects link */}
              <li>
                <a
                  href="#projects"
                  className="group flex items-center gap-2 text-sm text-muted-gray transition-colors duration-200 hover:text-mint"
                >
                  <ChevronRight
                    size={15}
                    className="text-mint transition-transform duration-200 group-hover:translate-x-1"
                  />
                  <span>Projects</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 3: Contact Information */}
          <div>
            <h3 className="mb-5 font-display text-xl font-semibold text-off-white">
              Contact Info
            </h3>

            <div className="space-y-4">

              {/* Phone */}
              <div className="flex items-center gap-3 text-sm text-muted-gray">
                <Phone
                  size={17}
                  className="shrink-0 text-mint"
                />
                <a
                  href={`tel:${profile.phoneLink}`}
                  className="transition-colors hover:text-mint"
                >
                  {profile.phone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 text-sm text-muted-gray">
                <Mail
                  size={17}
                  className="shrink-0 text-mint"
                />
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all transition-colors hover:text-mint"
                >
                  {profile.email}
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 text-sm text-muted-gray">
                <MapPin
                  size={17}
                  className="shrink-0 text-mint"
                />
                <span>{profile.location}</span>
              </div>

              {/* GitHub */}
              {github?.href && (
                <div className="flex items-center gap-3 text-sm text-muted-gray">
                  <SiGithub
                    size={17}
                    className="shrink-0 text-mint"
                  />
                  <a
                    href={github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-mint"
                  >
                    GitHub Profile
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-mint/10 pt-6">

          {/* Copyright and Back to Top */}
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">

            <p className="text-center text-xs text-muted-gray sm:text-left">
              &copy; {new Date().getFullYear()} {profile.name}.
              All rights reserved.
            </p>

            <a
              href="#home"
              onClick={(e) => {
                const homeSection = document.getElementById("home");

                if (homeSection) {
                  e.preventDefault();
                  homeSection.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
              className="group inline-flex items-center gap-2 text-xs font-medium text-muted-gray transition-colors hover:text-mint"
            >
              Back to Top

              <ArrowUp
                size={15}
                className="transition-transform duration-200 group-hover:-translate-y-1"
              />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
