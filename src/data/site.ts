// Absolute site URL for metadata (Open Graph images, sitemap). Uses
// NEXT_PUBLIC_SITE_URL if set, else Vercel's production domain, else localhost.
// TODO: set NEXT_PUBLIC_SITE_URL once Aadi picks a custom domain.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  url: siteUrl,
  name: "Aadi Belwal",
  title: "Software Engineer",
  description:
    "Computer Science student at Purdue University building backend and cloud systems and multiplayer mobile games.",
  // From the résumé summary plus the Unico Studio (games) internship.
  intro:
    "CS student at Purdue with four software internships across backend, cloud, and game development, from hardened web services to multiplayer for production mobile games.",
  email: "aadibelwal@gmail.com",
  linkedin: "https://linkedin.com/in/aadi-belwal",
  location: "Palo Alto, CA / West Lafayette, IN",
  status: "Open to Summer 2027 internships",
} as const;

/** About section copy. Facts from the résumé; no claims beyond it. Don't feature StatusGo here (Aadi just started). */
export const about = {
  // Revealed word by word on scroll.
  statement:
    "I build software that keeps working after it ships, from backend services that hold up under real traffic to multiplayer mobile games.",
  paragraphs: [
    "I'm a Computer Science student at Purdue University with junior standing, graduating in May 2028, and I've had four software internships across web, data, and games. As a volunteer, I also led a Python program for 100+ K–8 students at Sewa International, designing the curriculum and managing volunteer teachers.",
    "On my own projects I gravitate to the backend: APIs that validate their input, caches and retries that hold up when an upstream service doesn't, and tests that run offline. OrbitTrack's data mirror came out of a real production outage.",
    "I got into game development in middle school, trying to rebuild my favorite racing game in Unity. It was rough, but it was the first real game I worked on. Now I'm building Relay, a top-down puzzle game in Unity where every rewind leaves behind a ghost of your past run that you have to work with.",
    "At Unico Studio I worked on Liquid Sort, a mobile puzzle game: its touch controls, core gameplay, and liquid shaders, plus a procedural level generator that throws out any level that can't be solved. I also built turn-based and head-to-head multiplayer and fixed bugs in live games like Brain Test.",
  ],
};

/** Home-page sections, in page order. `id` is the section's DOM id. */
export const nav = [
  { id: "top", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

/** Hero counters — all from the résumé. */
export const stats = [
  { value: 4, suffix: "", label: "Software internships" },
  { value: 100, suffix: "+", label: "Students in the Python program I led" },
  { value: 3, suffix: "rd", label: "Place at Purdue's largest freshman hackathon" },
] as const;

// No GitHub profile or résumé links on the site (Aadi tailors his résumé per
// application). Project pages still link each project's source repo.
export const socials = [{ label: "LinkedIn", href: site.linkedin }] as const;
