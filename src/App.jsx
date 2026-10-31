import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import AboutMe from "./components/sections/AboutMe";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Education from "./components/sections/Education";
import Experience from "./components/sections/Experience";
import FeaturedWork from "./components/sections/FeaturedWork";
import Contact from "./components/sections/Contact";

/**
 * App
 * Composes the page from reusable sections. All content comes from
 * src/data/portfolioData.js.
 */
function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Skip link helps keyboard users jump straight to the content. */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-mint focus:px-4 focus:py-2 focus:text-charcoal"
      >
        Skip to content
      </a>

      <main>
        <Hero />
        <AboutMe />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <FeaturedWork />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
