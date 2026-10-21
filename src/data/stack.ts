// From CLAUDE.md §4, plus TypeScript and Docker, which Aadi's own commits use
// (SignMeUp's React + TypeScript frontend and Dockerfile, Modulos).
// `logo` is a file in public/logos/ (monochrome Simple Icons, CC0). Items
// without one render as a text chip — AWS, C#, Java, and Delta Lake have no
// official mark in Simple Icons.

export type StackItem = { name: string; logo?: string };
export type StackGroup = { label: string; items: StackItem[] };

export const stack: StackGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "Python", logo: "python" },
      { name: "TypeScript", logo: "typescript" },
      { name: "JavaScript", logo: "javascript" },
      { name: "C++", logo: "cplusplus" },
      { name: "C", logo: "c" },
      { name: "Java" },
      { name: "C#" },
      { name: "SQL" },
      { name: "R", logo: "r" },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "FastAPI", logo: "fastapi" },
      { name: "Flask", logo: "flask" },
      { name: "Django", logo: "django" },
      { name: "React", logo: "react" },
      { name: "Unity", logo: "unity" },
      { name: "Skyfield" },
    ],
  },
  {
    label: "Data & Cloud",
    items: [
      { name: "AWS Glue" },
      { name: "AWS S3" },
      { name: "PySpark", logo: "apachespark" },
      { name: "Delta Lake" },
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "pandas", logo: "pandas" },
      { name: "Render", logo: "render" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", logo: "git" },
      { name: "GitHub Actions", logo: "githubactions" },
      { name: "pytest", logo: "pytest" },
      { name: "Docker", logo: "docker" },
    ],
  },
];
