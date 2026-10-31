/**
 * portfolioData.js
 * ---------------------------------------------------------------
 * ALL of the website content lives in this one file.
 * To update the portfolio, edit the values below — you rarely need
 * to touch any component file.
 */

// ===== Profile / Hero =====
// Builds asset URLs that follow Vite's `base` setting, so images keep working
// on localhost, file/hosted sub-paths, and static previews.
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const profile = {
  name: "Htet Nandar Linn",
  /***** Professional title *****/
  title: "Full Stack Developer",
  location: "Yangon, Myanmar",
  email: "htetnandarlinn14@gmail.com",
  // Displayed phone number vs. the value used inside the tel: link
  phone: "+959 752479443",
  phoneLink: "+959752479443",
  github: "https://github.com/htetnandarlinn14",
  // Replace this file with a new photo if you ever change your picture.
  imageSrc: asset("images/profile.jpg"),
  imageAlt: "Portrait of Htet Nandar Linn",
};

// ===== Hero =====
// The greeting and name animate in, then `typed` rotates one phrase at a time.
// `role` is the stable, screen-reader-friendly description of what you do.
export const hero = {
  greeting: "Hi There,",
  name: profile.name,
  nameHighlight: "Linn",
  role: "Full Stack Developer",
  typed: ["Full Stack Developer", "Web Developer"],
};

// ===== Navigation links (used by the navbar and footer) =====
export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

// ===== About Me =====
export const about = {
  // Large lead line at the top of the About section (`<strong>` is allowed).
  lead: "I'm <strong>Htet Nandar Linn</strong>",
  // Accent line shown just under the lead.
  role: "Full Stack Developer",
  paragraphs: [
    "<strong>I'm a Full Stack Developer</strong> with approximately <strong>1 year of experience</strong> in web development. I enjoy building <strong>responsive web applications</strong> and writing <strong>clean, maintainable code</strong>.",
    "My technical skills include <strong>PHP</strong>, <strong>Laravel</strong>, <strong>React</strong>, <strong>JavaScript</strong>, <strong>HTML5</strong>, <strong>CSS3</strong>, <strong>Tailwind CSS</strong>, and <strong>MySQL</strong>. I also use <strong>Git</strong>, <strong>GitHub</strong>, <strong>Vite</strong>, <strong>Postman</strong>, and <strong>Figma</strong> in my development workflow.",
    "Currently, I work at <strong>ITVisionHub Co., Ltd.</strong> in <strong>Yangon, Myanmar</strong>, where I continue developing my technical skills and gaining practical experience in software development.",
  ],
};

// ===== Technical Skills =====
// One flat list rendered as a unified "Skills & Abilities" grid.
// `icon` is a react-icons component, `color` is the official brand color.
// Add or remove entries freely — the UI adapts.
import {
  SiPhp,
  SiLaravel,
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiMysql,
  SiGithub,
  SiVite,
  SiPostman,
  SiFigma,
  SiGit,
} from "react-icons/si";

export const skills = {
  note: "Technologies and tools I have learned and used in coursework and personal projects. I'm continuing to build depth in each of them.",
  list: [
    { name: "PHP", icon: SiPhp, color: "#777BB4" },
    { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    { name: "React.js", icon: SiReact, color: "#61DAFB" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss, color: "#1572B6" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "GitHub", icon: SiGithub, color: "#F8FFFC" },
    { name: "Vite", icon: SiVite, color: "#646CFF" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { name: "Git", icon: SiGit, color: "#F05032" },
  ],
};

// ===== Projects =====
// `demoUrl` / `repoUrl` are null until a real, confirmed URL exists.
// While they are null the card links to the GitHub profile instead of
// inventing a repository link. Leave `imageSrc` empty to show the
// generated initials placeholder.
export const projects = [
  {
    id: 5,
    title: "Campus Food Ordering System",
    type: "PHP web application",
    description:
      "A web-based campus food ordering system built with PHP and MySQL to organize food ordering and campus canteen operations. Includes food management, a shopping cart, user access control, authentication, order management, email integration (PHPMailer), PDF generation (Dompdf), and Google API integration.",
    architecture: "PHP routing + MySQL database",
    imageSrc: "",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Composer", "PHPMailer", "Dompdf", "Google API"],
    demoUrl: null,
    repoUrl: "https://github.com/htet-nandar-linn/Campus-Food-Ordering-System",
  },
  {
    id: 3,
    title: "Horizon Banking Platform",
    type: "Fintech web application",
    description:
      "A fintech dashboard that connects multiple bank accounts, shows balances and transaction history in real time, and lets users transfer funds securely. Includes SSR authentication, bank linking, spending summaries, and a responsive interface.",
    architecture: "Next.js App Router · SSR authentication",
    imageSrc: "",
    technologies: ["Next.js", "TypeScript", "Appwrite", "Plaid", "Tailwind CSS"],
    demoUrl: null,
    repoUrl: "https://github.com/htet-nandar-linn/banking",
  },
  {
    id: 4,
    title: "Movie Discovery App",
    type: "React web application",
    description:
      "A movie discovery app powered by the TMDB API. Browse popular films, search by title, view posters and details, and see the most-searched movies ranked on the home page using browser storage.",
    architecture: "Component-based React · Local storage",
    imageSrc: "",
    technologies: ["React", "Vite", "JavaScript", "Tailwind CSS", "TMDB API"],
    demoUrl: null,
    repoUrl: "https://github.com/htet-nandar-linn/Vite-Project",
  },
  {
    id: 1,
    title: "Media Library Management System",
    type: "Web application",
    description:
      "A library management application organized into modules for catalog management, reservations, invoices, and notifications. The project explores object-oriented programming, the MVC pattern, and separation of application responsibilities.",
    architecture: "MVC · Object-Oriented Programming",
    imageSrc: "",
    technologies: ["PHP", "MySQL"],
    demoUrl: null,
    repoUrl: "https://github.com/htet-nandar-linn/Media-Library",
  },
  {
    id: 2,
    title: "Grape Cultivation Advisory Chat System",
    type: "Web application",
    description:
      "An advisory chat system concept designed to help users access grape cultivation guidance. The application follows Domain-Driven Design (DDD) concepts to organize business rules and application responsibilities.",
    architecture: "Domain-Driven Design (DDD)",
    imageSrc: "",
    technologies: ["PHP", "MySQL", "JavaScript"],
    demoUrl: null,
    repoUrl: "https://github.com/htet-nandar-linn/GrapeCultivationAdvisoryChatSystem-AI-Chat-System",
  },
];

// ===== Services =====
export const services = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Building responsive, modern web applications with clean architecture and maintainable code across frontend and backend.",
    icon: "code",
    features: ["Frontend & Backend", "Responsive Design", "Clean Code"],
  },
  {
    id: 2,
    title: "Full Stack Solutions",
    description:
      "End-to-end development from UI design to database architecture, delivering complete and scalable solutions.",
    icon: "layers",
    features: ["API Development", "Database Design", "Deployment Ready"],
  },
  {
    id: 3,
    title: "UI/UX Implementation",
    description:
      "Translating designs into pixel-perfect, interactive interfaces with smooth animations and great user experience.",
    icon: "layout",
    features: ["Tailwind CSS", "Figma to Code", "Interactive UI"],
  },
];

// ===== Education =====
export const education = [
  {
    id: 1,
    degree: "Bachelor of Computer Science (B.C.Sc.)",
    institution: "University of Computer Studies, Meiktila",
    location: "Meiktila, Myanmar",
    period: "Expected graduation: 2027",
    status: "In progress",
  },
];

// ===== Experience =====
export const experience = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "ITVisionHub Co., Ltd.",
    location: "Yangon, Myanmar",
    period: "2025 – Present",
    type: "Current Role",
    description:
      "Working as a Full Stack Developer, building and maintaining web applications across both frontend and backend.",
    technologies: [
      "PHP",
      "Laravel",
      "React.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "MySQL",
      "Git",
      "GitHub",
      "Vite",
      "Postman",
      "Figma",
    ],
  },
];

// ===== Contact =====
export const contact = {
  heading: "Let's work together",
  subheading:
    "I'm currently looking for internship and junior developer opportunities. If you'd like to get in touch, email and phone are the fastest ways to reach me.",
};

// ===== Social / contact links =====
// Give a link a real `href` to make it clickable. `icon` matches a key in
// the icon map inside the Contact and Footer components.
export const socialLinks = [
  {
    id: 1,
    name: "Email",
    icon: "mail",
    href: "mailto:htetnandarlinn14@gmail.com",
    value: "htetnandarlinn14@gmail.com",
  },
  {
    id: 2,
    name: "Phone",
    icon: "phone",
    href: "tel:+959752479443",
    value: "+959 752479443",
  },
  {
    id: 3,
    name: "GitHub",
    icon: "github",
    href: "https://github.com/htetnandarlinn14",
    value: "github.com/htetnandarlinn14",
  },
];
