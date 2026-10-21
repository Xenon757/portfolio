export const site = {
  name: "Aadi Belwal",
  title: "Software Engineer",
  description:
    "Computer Science student at Purdue University building backend, cloud, and production systems.",
  // From the résumé summary.
  intro:
    "CS student at Purdue with four software internships across backend, cloud, and production systems — I like hardening and shipping public web services.",
  email: "aadibelwal@gmail.com",
  github: "https://github.com/Xenon757",
  linkedin: "https://linkedin.com/in/aadi-belwal",
  location: "Palo Alto, CA / West Lafayette, IN",
  resume: "/resume.pdf",
  status: "Open to Summer 2027 internships",
} as const;

/** Home-page sections, in page order. `id` is the section's DOM id. */
export const nav = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export const socials = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Résumé", href: site.resume },
] as const;
