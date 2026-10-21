// From Aadi's résumés — see CLAUDE.md §4. Keep StatusGo's wording in progress
// ("Migrating"): no completion, runtime, or record-count claims.

export type Experience = {
  company: string;
  /** Company site, linked from the name. */
  url?: string;
  role: string;
  /** "Volunteer" entries get a small label. */
  kind?: "volunteer";
  start: string;
  end: string;
  /** Omitted when not on the résumé. */
  location?: string;
  bullets: string[];
  /** Kept in the data but not shown on the site. */
  hidden?: boolean;
};

export const allExperience: Experience[] = [
  {
    company: "StatusGo",
    role: "Software Engineer Intern",
    start: "Sep 2026",
    end: "Present",
    location: "Remote",
    // Aadi just started — show the role only, no details (Oct 2026). For later, the
    // résumé bullet is: "Migrating a nightly data-processing pipeline from pandas to
    // PySpark on AWS Glue, with Delta Lake on S3." Keep it in-progress wording.
    bullets: [],
  },
  {
    company: "Unico Studio",
    role: "Software Engineer Intern",
    start: "May 2026",
    end: "Aug 2026",
    location: "Palo Alto, CA",
    bullets: [
      "Developed and debugged features in C# and Unity for production mobile games, including Brain Test.",
      "Integrated the AppLovin MAX ad SDK into production games with no-fill fallback handling.",
      "Built networked multiplayer, syncing player and game state across clients with Netcode for GameObjects.",
    ],
  },
  {
    company: "Bazar Earth",
    // The company's product, built by a team — link it, never imply Aadi built it alone.
    url: "https://bazar.earth/",
    role: "Full Stack Engineer Intern",
    start: "Sep 2024",
    end: "Sep 2025",
    location: "Palo Alto, CA",
    bullets: [
      "Built backend features in Python (Django) and frontend features in React for an e-commerce web app.",
      "Redesigned search with PostgreSQL trigram similarity, cutting query time from 3 s to 180 ms.",
      "Improved mobile usability by fixing overlapping controls, broken spacing, and off-viewport elements.",
    ],
  },
  {
    company: "Probability Management",
    role: "Software Engineer Intern",
    start: "Jan 2023",
    end: "Aug 2024",
    location: "Palo Alto, CA",
    bullets: [
      "Built interactive JavaScript visualizations that turn ChanceCalc's simulation output into readable charts.",
      "Wrote Python scripts to clean and analyze CSV and Excel datasets, replacing manual spreadsheet work.",
      "Mentored a new team member on ChanceCalc's design as they contributed to the calculator.",
    ],
  },
  {
    company: "Sewa International",
    role: "Python Teacher Lead",
    kind: "volunteer",
    start: "Oct 2021",
    end: "Aug 2024",
    bullets: [
      "Led a Python program for 100+ K–8 students: designed the curriculum, managed volunteer teachers, built aptitude assessments, and matched students to teachers.",
      "Redesigned the curriculum for online classes during COVID.",
      "Also taught 2nd grade math, reading, writing, science, and art.",
    ],
  },
];

export const experience = allExperience.filter((e) => !e.hidden);
