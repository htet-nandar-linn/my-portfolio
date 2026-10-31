/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // ===== Design tokens (mint + charcoal palette) =====
      colors: {
        mint: "#A8F0D0", // primary mint (high contrast on dark)
        "deep-mint": "#65D6AD", // accent green for eyebrows, links, borders
        charcoal: "#101820", // main page background
        "secondary-dark": "#18252B", // panels and cards
        "off-white": "#F8FFFC", // main text
        "muted-gray": "#A5B5AF", // secondary text (still readable on dark)
        "soft-mint": "#E9FFF5", // light mint, used sparingly
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        display: ["Sora", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "mint-gradient": "linear-gradient(135deg, #A8F0D0 0%, #65D6AD 100%)",
        "panel-gradient": "linear-gradient(160deg, #18252B 0%, #101820 100%)",
        // NOTE: every layer of a background-image must be a gradient, so the
        // charcoal base is expressed as a flat linear-gradient (not a color).
        "page-gradient":
          "radial-gradient(1200px 600px at 80% -10%, rgba(101, 214, 173, 0.14), transparent 60%), radial-gradient(900px 500px at 0% 20%, rgba(168, 240, 208, 0.07), transparent 55%), linear-gradient(#101820, #101820)",
      },
      boxShadow: {
        // Soft mint glow used on hover states and behind the portrait.
        glow: "0 18px 50px -22px rgba(101, 214, 173, 0.5)",
        card: "0 16px 40px -28px rgba(0, 0, 0, 0.85)",
        "glow-lg": "0 30px 80px -34px rgba(101, 214, 173, 0.55)",
      },
      keyframes: {
        // Single tasteful entrance used by the hero.
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.9" },
        },
        heroBlur: {
          from: { opacity: "0", filter: "blur(0.5em)" },
          to: { opacity: "1", filter: "blur(0)" },
        },
        heroIn: {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, 1.75rem, 0)",
            filter: "blur(0.35em)",
          },
          "60%": { opacity: "1", filter: "blur(0)" },
          "75%": { transform: "translate3d(0, -0.25rem, 0)" },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
            filter: "blur(0)",
          },
        },
        caretBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        float: "float 7s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "hero-blur": "heroBlur 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "hero-in": "heroIn 0.95s cubic-bezier(0.22, 1, 0.36, 1) both",
        "caret-blink": "caretBlink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
