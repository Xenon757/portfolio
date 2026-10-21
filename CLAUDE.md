# CLAUDE.md — Aadi Belwal Portfolio

Personal portfolio site for **Aadi Belwal**, Computer Science student at Purdue University (junior credit standing, expected graduation May 2028). This file tells Claude Code what we're building, how, and the rules for working in this repo.

---

## 1. Goal

A fast, polished, single-page portfolio with per-project detail pages. Visual and structural inspiration: **https://www.tajmirul.site/** (dark, bold uppercase type, big hero headline, stat counters, scroll-driven GSAP animations, smooth scrolling, numbered project list with hover image preview, sticky side menu).

**Inspiration, not a clone.** The reference site's source is public (github.com/Tajmirul/portfolio-2.0), but do **not** copy its code, copy text, images, logos, or exact layouts. Recreate the *feel* — dark minimal aesthetic, motion, typographic hierarchy — with our own components, palette, and content.

Primary audience: internship recruiters (SWE, backend/cloud, ground software, firmware/embedded). A recruiter should understand who Aadi is and see the three projects within ~10 seconds.

---

## 2. Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript (strict) |
| Styling | Tailwind CSS |
| Animation | GSAP + ScrollTrigger (via `@gsap/react` `useGSAP`) |
| Smooth scroll | Lenis (synced to ScrollTrigger) |
| Icons | lucide-react |
| Fonts | `next/font` (one display font, e.g. Anton/Bebas Neue for headings; Inter/Geist for body) |
| Images | `next/image`, `.webp` thumbnails in `public/projects/` |
| Deploy | Vercel |
| Package manager | pnpm |

Don't add Redux, a CMS, a database, or a UI kit — content is static and lives in TypeScript files.

---

## 3. Site structure

### Home (`/`) — sections in order
Projects come right after the hero (decided with Aadi): recruiters already have the résumé, so the site's unique value is the projects. Experience stays, but lower and compact.

1. **Hero** — "SOFTWARE ENGINEER" headline (huge, uppercase), one-line intro, CTA buttons (Email / GitHub / LinkedIn / Résumé), small status pill ("Open to Summer 2027 internships"), and a "View projects" link to `#projects`. Staggered text reveal on load. **Stats live inside the hero** (right column on desktop, a row on mobile) and count up as it reveals. Use these (all from the résumé):
   - `4` — Software internships
   - `100+` — Students in the Python program he led (confirmed by Aadi)
   - `3rd` — Place at Purdue's largest freshman hackathon (HelloWorld)
2. **Selected Projects** — numbered list (`_01.`, `_02.`, `_03.`) with project name + tech tags; on desktop, hovering a row shows a floating thumbnail that follows the cursor. Each row links to `/projects/[slug]`.
3. **About** — short paragraph + a large statement line that reveals word-by-word on scroll. Draft from the résumé summary: backend, cloud, and production systems; hardening and deploying public web services; teaching background. Don't mention StatusGo in About — Aadi just started there (it stays in Experience).
4. **Stack** — grouped logo grid (see `stack.ts` in §4).
5. **Experience** — compact vertical list: company, role, dates, location, 1–3 bullets (expandable on click). Lines draw in on scroll. Sewa International is included as a "Volunteer" entry.
6. **Contact / Footer** — big "Have an opportunity in mind?" + email, socials, "Designed & built by Aadi Belwal".

### Sticky menu
Hamburger (top-right) opening a full-screen overlay with Social / Menu / Get in touch columns. Menu links smooth-scroll to sections via Lenis.

### Project detail (`/projects/[slug]`)
Generated with `generateStaticParams` from the project data. Layout: back link, title, tech tags, Live / Source buttons, hero screenshot, then **Problem → What I built → How it works → My role → What's next**. Previous/next project links at the bottom.

---

## 4. Content (source of truth)

All content lives in `src/data/` — components never hardcode copy. Content below comes from Aadi's résumé (Oct 2026).

### `site.ts`
- Name: Aadi Belwal
- Email: aadibelwal@gmail.com
- GitHub: https://github.com/Xenon757
- LinkedIn: https://linkedin.com/in/aadi-belwal
- Location: Palo Alto, CA / West Lafayette, IN
- Résumé: `public/resume.pdf` (Aadi's SWE-intern version). It includes his phone number — Aadi approved that.
- Status: "Open to Summer 2027 internships"
- **Don't put his phone number anywhere else** — not in page copy, data files, or metadata.

### `projects.ts`

Display order: OrbitTrack, SignMeUp, Modulos — finished projects first, in-progress Modulos last (per Aadi). The full page copy lives in `src/data/projects.ts`, written from each repo's README and commit history (checked 2026-10-21). The repos are the source of truth for technical facts and supersede older résumé figures; the notes below are the summary.

**01 — OrbitTrack** `slug: orbittrack` — solo project (all commits are Aadi's)
- Tags: Python, Skyfield, FastAPI, pytest, mypy, GitHub Actions, Render
- Live: https://orbittrack-dpeo.onrender.com/ · Source: https://github.com/Xenon757/Orbittrack
- What it does: predicts satellite passes for any ground station (six CelesTrak groups incl. weather and amateur radio) by propagating TLEs with SGP4 via Skyfield — rise/peak/set times, look angles, polar sky plot, ground-track map, live predicted position. FastAPI web app, JSON API, and a CLI with multi-satellite/multi-station contact scheduling. Accuracy check against NASA's ISS ephemeris.
- Hardening: group allowlist (path traversal / request spam), range-checked params (422), 72 h window cap, HTML escaping, lock-protected shared TLE cache.
- Testing: **135** offline tests (README; the older résumé said 123). Brute-force cross-check (2 s sampling over 48 h) agrees on pass count with times **within 3 s**. "Within half a second" is the precision of Skyfield's event finder, **not** the cross-check — don't conflate them.
- Ops story: Render → CelesTrak requests timed out in production → GitHub Actions mirrors the six groups to GitHub Pages every 6 h; 5-minute retry back-off with immediate 503.
- Render free tier: first load can take up to about a minute to wake.
- What's next (confirmed by Aadi, already in progress): multi-satellite scheduling in the web app, accuracy vs. TLE age across successive NASA ephemerides, atmospheric refraction + priority-aware scheduling.

**02 — SignMeUp** `slug: signmeup`
- Tags: Python, Flask, Whisper, Stanza, MediaPipe, React, TypeScript, pytest, Fly.io
- Live: https://signmeup.fly.dev/ · Source: https://github.com/Xenon757/SignMeUp (fork of ShlokShar/SignMeUp) · Devpost: https://devpost.com/software/signmeup-the-asl-subtitle
- **Won 3rd place at HelloWorld 2025**, Purdue's largest hackathon for freshmen. Team project — credit the original team (as a group, per Aadi) and link the original repo and Devpost.
- At the hackathon: Flask pipeline transcribing with Whisper and converting speech into ASL signs with Stanza parsing.
- Since the hackathon, all work in the fork is Aadi's (82 commits, Sep 2025 – Oct 2026): upload video/audio → Whisper with word timestamps → ASL grammar rules → 2D animated signer built from ASL Signbank videos with MediaPipe, timed to speech; React + TypeScript frontend; demo page ("Me at the zoo" in YouTube's player) and compare page; path-traversal fix + upload hardening with regression test; Docker + Fly.io + GitHub Actions CI/CD. **130** Python + **11** frontend tests (the older résumé said 25).
- Don't use frames of the YouTube demo video in screenshots (third-party video showing a real person).
- What's next: none listed (Aadi is fine with the page as is).

**03 — Modulos** `slug: modulos` (formerly **PayoffPal** — renamed Oct 2026)
- Tags: TypeScript, React, AWS Amplify, Cognito, AppSync, DynamoDB, Lambda, Plaid
- Personal debt-management companion: enter (or import from your bank) income, expenses, and loans; get a debt-to-income affordability check for a new loan; build an avalanche payoff plan (highest APR first) with an interactive extra-payment timeline.
- Live: https://www.modulos.app/ · Source: https://github.com/sri-meduri/modulos
- Status: **In development** — show an "In progress" badge.
- Team project with **Sri Meduri** (github.com/sri-meduri, owns the repo). Credit Sri on the project page.
  - Sri: came up with the idea; handles marketing; also built the 12-month income vs. expenses chart.
  - Aadi: built the original interface and the financial math, then rebuilt the backend on AWS and built the bank integration (details below).
- Aadi's work (confirmed by Aadi; backend items from his commits, Jul 2026):
  - Built the original app (as PayoffPal): the original interface and the financial logic — avalanche payoff math, the debt-to-income affordability check with risk profiles, and the gross→net take-home pay (tax) calculation.
  - Rebuilt the app on **AWS Amplify Gen 2**: Cognito auth (email/password + Google sign-in), AppSync + DynamoDB data models scoped per user with owner-based authorization, deployed through Amplify's CI pipeline.
  - **Plaid bank integration** via a Lambda function: link-token creation, public-token exchange, sync of loans/expenses/12-month income-vs-expense history, and disconnect.
  - Security design: Plaid access tokens stored in a separate DynamoDB table that only the Lambda has IAM access to — no API path from the browser; OAuth redirect URLs validated against an allowlist; sandbox/production Plaid environment split.
  - Sync robustness: handles bank logins with no loan accounts, detects subscriptions from raw transactions when the recurring-transactions API isn't available, counts P2P payments (Zelle/Venmo) as cash flow while excluding own-account transfers, auto-retries sync until history arrives.
  - Hardened Google sign-in against stale browser sessions and surfaced auth/Plaid/write errors instead of failing silently.
  - Added a privacy policy page, consent line at sign-up, robots.txt and sitemap.
- Frontend: React 19, Vite, Tailwind, Recharts, React Router.
- "My role" must describe only Aadi's engineering work — don't credit him with the idea, marketing, or Sri's income vs. expenses chart.
- Don't claim users, real-bank production status, or launch — it's in development.
- Screenshots in `public/projects/` (taken from guest mode with fictional sample data — not real user data):
  - `modulos-thumb.webp` — payoff plan with extra-payment simulation (Aadi's payoff math)
  - `modulos-landing.webp` — landing page hero
  - `modulos-dashboard.webp` — dashboard; its income vs. expenses chart is Sri's work, so caption it neutrally
  - `modulos-payoff-chart.webp` — payoff timeline + per-loan schedules
- Sri approved being named and linked.
- What's next: just "still in development" (no roadmap to list, per Aadi).

### `experience.ts`

**StatusGo** — Software Engineer Intern · Remote · Sep 2026 – Present
- Migrating a nightly data-processing pipeline from pandas to PySpark on AWS Glue with Delta Lake on S3.
- Keep the **in-progress** wording ("Migrating"). Do not claim completion, runtime improvements, or record counts.
- **Show the role only — no bullets/details** (Aadi just started). Listed in Experience (company, role, dates, location); not mentioned in About.

**Unico Studio** — Software Engineer Intern · Palo Alto, CA · May 2026 – Aug 2026
- Developed and debugged features in C# and Unity for production mobile games including Brain Test.
- Integrated the AppLovin MAX ad SDK into production games with no-fill fallback handling.
- Built networked multiplayer, syncing player and game state across clients with Netcode for GameObjects.

**Bazar Earth** — Full Stack Engineer Intern · Palo Alto, CA · Sep 2024 – Sep 2025
- Website: https://bazar.earth/ — link the company name to it in the Experience list. It's the company's product, built by a team; Aadi contributed features as an intern. Keep it under Experience only (not Selected Projects), and never phrase it as something he built himself.
- Built backend features in Python (Django) and frontend features in React for an e-commerce web app.
- Redesigned search with PostgreSQL trigram similarity, cutting query time from 3s to 180ms.
- Improved mobile usability by fixing overlapping controls, broken spacing, and off-viewport elements.

**Probability Management** — Software Engineer Intern · Palo Alto, CA · Jan 2023 – Aug 2024
- Built interactive JavaScript visualizations turning ChanceCalc simulation output into readable charts.
- Wrote Python scripts to clean and analyze CSV/Excel datasets, replacing manual spreadsheet work.
- Mentored a new team member on ChanceCalc's design as they contributed to the calculator.

**Sewa International** — Python Teacher Lead (Volunteer) · Oct 2021 – Aug 2024
- Led a Python program for 100+ K–8 students: designed the curriculum, managed volunteer teachers, built aptitude assessments, and matched students to teachers.
- Redesigned the curriculum for online classes during COVID.
- Also taught 2nd grade math, reading, writing, science, and art.

### `stack.ts`
- **Languages:** Python, TypeScript, JavaScript, C++, C, Java, C#, SQL, R (TypeScript added from Aadi's commits in SignMeUp/Modulos)
- **Frameworks:** FastAPI, Flask, Django, React, Unity, Skyfield
- **Data & Cloud:** AWS (Glue, S3), PySpark, Delta Lake, PostgreSQL, Pandas, Render
- **Tools:** Git, GitHub Actions, pytest, Docker (Docker added from SignMeUp's Dockerfile, Aadi's commit)

Use official SVG logos where available; text-only chip as fallback.

### Honesty rules for copy
- Never invent metrics, users, awards, dates, or tech beyond what's above or confirmed by Aadi.
- Where résumé versions conflict, use the more conservative claim and flag it as a TODO.
- Team projects say "team project" and credit teammates.
- When content is missing, leave a visible `TODO:` in the data file and list it in your summary — don't fill with plausible filler.

---

## 5. Design system

- **Theme:** dark by default. Define tokens as CSS variables in `globals.css` and map them in `tailwind.config`:
  - `--bg` dark grey (#1f1f21, per Aadi), `--fg` off-white, `--muted` gray, `--accent` one bright accent (pick something original — not the reference site's color).
- **Background:** faint drifting, twinkling dot field (`DotField` canvas) behind the whole site; still under reduced motion.
- **Intro:** first-visit intro — name over black columns that wipe away left to right (`Intro`); once per session, skippable.
- **Cursor:** custom arrow cursor (`Cursor`) that trails the pointer and turns toward the direction of movement; grows + accent on links/buttons. Mouse/trackpad only; native cursor kept without JS.
- **Type scale:** hero headline `clamp(3rem, 12vw, 10rem)`, uppercase, tight leading; section headings uppercase with small label above (`MY STACK`, `SELECTED PROJECTS`).
- **Spacing:** generous; sections ≥ `py-24` on desktop.
- **Responsive:** mobile-first; test at 375px, 768px, 1280px, 1920px. Cursor-follow thumbnails are desktop-only (`pointer: fine`).

---

## 6. Animation rules

- Register GSAP plugins once in `src/lib/gsap.ts`; import from there.
- Use `useGSAP` with a scoped container ref so animations clean up on unmount/route change.
- Lenis lives in a single client provider (`src/components/providers/SmoothScroll.tsx`) and drives `ScrollTrigger.update` on scroll.
- **Respect `prefers-reduced-motion`:** disable Lenis and skip/shorten all GSAP animations; content must be fully visible without JS animation.
- Animate only `transform` and `opacity`.
- Set initial animation states in JS, not CSS, so content is never hidden if JS fails.

---

## 7. Project layout

```
src/
  app/
    layout.tsx           # fonts, metadata, providers
    page.tsx             # home: composes sections
    projects/[slug]/page.tsx
    not-found.tsx
    sitemap.ts, robots.ts
  components/
    sections/            # Hero (incl. stats), Projects, About, Stack, Experience, Contact
    ui/                  # Button, Tag, Counter, SectionHeading, Menu
    providers/           # SmoothScroll
  data/                  # site.ts, projects.ts, experience.ts, stack.ts
  lib/                   # gsap.ts, utils.ts
public/
  projects/              # <slug>-thumb.webp, <slug>-*.webp
  logos/                 # stack logos (SVG preferred)
  resume.pdf
docs/
  orbittrack-brief.md    # optional; overrides OrbitTrack copy
```

Server components by default; add `"use client"` only to components that animate or handle interaction.

---

## 8. Quality bar

- Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, SEO (mobile).
- Semantic HTML, one `<h1>` per page, alt text on every image, visible focus states, keyboard-operable menu (Esc closes, focus trapped while open).
- Per-page `metadata` + Open Graph image; project pages use the project thumbnail.
- No console errors or hydration warnings.
- `pnpm lint` and `pnpm build` must pass before any commit.

---

## 9. Commands

```bash
pnpm dev        # local dev server
pnpm build      # production build (must pass)
pnpm lint       # eslint
```

---

## 10. Git & workflow rules

- Commits must be authored as **Aadi Belwal** using the repo's configured git identity. **Do not** add `Co-Authored-By: Claude` trailers, "Generated with Claude Code" lines, or otherwise list Claude as a contributor.
- Small, focused commits with clear messages (`feat: add projects section hover preview`).
- Don't push or deploy without Aadi's go-ahead.
- Don't add new dependencies beyond §2 without asking.
- Build order: scaffold + design tokens → layout/menu/Lenis → Hero → Projects (+ detail pages) → About/Stack/Experience → Contact → polish/animations → SEO/Lighthouse pass.
- At the end of each work session, list any remaining `TODO:` items that need Aadi's input.
