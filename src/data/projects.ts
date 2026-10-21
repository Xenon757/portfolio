// Project content. Written from each repo's README and commit history (checked
// 2026-10-21) plus details Aadi confirmed — see CLAUDE.md §4. Don't add claims
// that aren't backed by one of those.

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  /** One line for the list and page header. */
  tagline: string;
  tags: string[];
  status?: "in-progress";
  award?: string;
  live?: string;
  source?: string;
  /** Shown under the Live button, e.g. a cold-start warning. */
  liveNote?: string;
  /** Extra links (original repo, Devpost, ...). */
  links?: ProjectLink[];
  /** Team credit, shown near the top of the page. Omit for solo projects. */
  team?: string;
  thumbnail: ProjectImage;
  images: ProjectImage[];
  problem: string[];
  built: string[];
  how: { title: string; body: string }[];
  role: string[];
  /** Hidden when empty. */
  next: string[];
};

export const projects: Project[] = [
  {
    slug: "modulos",
    name: "Modulos",
    tagline:
      "A personal debt-management companion: check whether a new loan is affordable and plan the fastest way out of debt.",
    tags: ["TypeScript", "React", "AWS Amplify", "Cognito", "AppSync", "DynamoDB", "Lambda", "Plaid"],
    status: "in-progress",
    live: "https://www.modulos.app/",
    source: "https://github.com/sri-meduri/modulos",
    team: "Team project with Sri Meduri. Sri came up with the idea, runs marketing, and built the 12-month income vs. expenses chart. I built the app and its backend.",
    links: [{ label: "Sri on GitHub", href: "https://github.com/sri-meduri" }],
    thumbnail: {
      src: "/projects/modulos-thumb.webp",
      alt: "Modulos payoff plan: with $400 extra a month, debt-free in 2 years 9 months instead of 4 years 3 months, saving $3,630 in interest.",
    },
    images: [
      {
        src: "/projects/modulos-payoff-chart.webp",
        alt: "Modulos payoff timeline bar chart and per-loan payoff schedules for a credit card, auto loan, and student loan.",
        caption: "Avalanche payoff timeline and per-loan schedules (sample data).",
      },
      {
        src: "/projects/modulos-dashboard.webp",
        alt: "Modulos dashboard with a 12-month income and expenses chart and summary cards.",
        caption: "The dashboard (sample data).",
      },
      {
        src: "/projects/modulos-landing.webp",
        alt: "Modulos landing page: Take Control of Your Loans.",
        caption: "Landing page.",
      },
    ],
    problem: [
      "People juggling several loans often can't tell whether a new loan is actually affordable, or which debt to pay down first. Most tools that help either require a bank login or try to sell refinancing.",
      "Modulos answers both questions in a couple of minutes, with or without connecting a bank.",
    ],
    built: [
      "An affordability check that computes debt-to-income ratio against conservative, moderate, or aggressive thresholds and returns a clear Safe / Not recommended answer.",
      "An avalanche payoff planner that orders loans by APR, projects the payoff date and interest saved, and lets you drag an extra-payment slider to see the difference.",
      "Take-home pay from gross income: federal, state, and local income tax, FICA, 401(k), and other pre-tax deductions.",
      "Optional bank connection through Plaid that imports loans, recurring expenses, and 12 months of income vs. expense history.",
      "Accounts with email or Google sign-in, plus a guest mode that keeps everything in the browser.",
    ],
    how: [
      {
        title: "A serverless backend on AWS",
        body: "I rebuilt the app on AWS Amplify Gen 2: Cognito handles email/password and Google sign-in, an AppSync API on DynamoDB stores each user's finances with owner-based authorization, and Amplify's pipeline deploys the backend and frontend together.",
      },
      {
        title: "Bank tokens never reach the browser",
        body: "Plaid access tokens live in a separate DynamoDB table that only the Plaid Lambda function has IAM access to, so there's no API path to them at all. The browser only sees connection metadata. OAuth redirect URLs are checked against an allowlist, and sandbox and production Plaid environments are kept apart.",
      },
      {
        title: "Making bank sync hold up on real accounts",
        body: "Real bank logins broke the happy path, so sync now handles banks with no loan accounts, detects subscriptions from raw transactions when Plaid's recurring-transactions API isn't available, counts Zelle and Venmo payments as cash flow while ignoring transfers between your own accounts, and retries until a new connection's history arrives.",
      },
      {
        title: "Failing loudly instead of silently",
        body: "AppSync reports rejected writes in an errors array instead of throwing, so a failed save looked like a success. Saves now surface errors to the user, and values are cleaned into strict JSON (no NaN or undefined) before they're sent.",
      },
    ],
    role: [
      "Built the original app: the interface and the financial logic — avalanche payoff math, the debt-to-income affordability check, and the take-home pay calculation.",
      "Rebuilt the backend on AWS Amplify (Cognito, AppSync, DynamoDB, Lambda) and built the Plaid bank integration.",
      "Added the privacy policy, sign-up consent, and search-engine basics (robots.txt, sitemap).",
    ],
    // TODO: ask Aadi what's next for Modulos.
    next: [],
  },
  {
    slug: "orbittrack",
    name: "OrbitTrack",
    tagline:
      "Predicts when satellites pass over any ground station, with rise, peak and set times, sky paths and ground tracks, as a web app, JSON API and CLI.",
    tags: ["Python", "Skyfield", "FastAPI", "pytest", "mypy", "GitHub Actions", "Render"],
    live: "https://orbittrack-dpeo.onrender.com/",
    source: "https://github.com/Xenon757/Orbittrack",
    liveNote: "Hosted on Render's free tier, so the first load can take up to a minute while it wakes up.",
    thumbnail: {
      src: "/projects/orbittrack-thumb.webp",
      alt: "OrbitTrack web app showing prediction parameters and a countdown to the ISS's next pass over West Lafayette, IN.",
    },
    images: [
      {
        src: "/projects/orbittrack-passes.webp",
        alt: "OrbitTrack pass table with rise, peak, and set times next to a polar sky plot of each pass.",
        caption: "Upcoming ISS passes and a polar sky plot of each pass's path.",
      },
      {
        src: "/projects/orbittrack-map.webp",
        alt: "OrbitTrack ground-track map with passes over West Lafayette highlighted inside the station's coverage circle.",
        caption: "Ground track, with passes over the station highlighted inside its coverage circle.",
      },
    ],
    problem: [
      "To hear a weather satellite or talk to the ISS on amateur radio, a ground station needs to know exactly when a satellite will be overhead and where to point. Passes last only a few minutes, and they depend on the station's location and the latest orbital elements.",
    ],
    built: [
      "Pass prediction for any satellite in six CelesTrak groups (space stations, brightest, weather, amateur radio, science, GPS) from any location: rise, peak and set times, max elevation, direction, and duration.",
      "A web app with shareable URLs, a pass table, a polar sky plot, a ground-track map, and the satellite's predicted position updating every second.",
      "A documented JSON API (/api/passes) with interactive docs.",
      "A command-line tool that also schedules contacts across several satellites and stations, dropping overlaps since one antenna can only track one satellite at a time.",
      "An accuracy check against NASA's published ISS ephemeris.",
    ],
    how: [
      {
        title: "Propagation and pass finding",
        body: "OrbitTrack downloads two-line elements (TLEs) from CelesTrak and propagates them with SGP4 through Skyfield. Instead of stepping through time, it uses Skyfield's event finder to locate each horizon-mask crossing to within half a second, then groups crossings into complete rise → peak → set passes.",
      },
      {
        title: "Hardened for public traffic",
        body: "Only six CelesTrak groups are accepted, because the group name becomes part of a cache file path and an outbound request, and free text could be used for path traversal or to spam CelesTrak. Every parameter is range-checked (bad values get a 422), the window is capped at 72 hours, visitor input is HTML-escaped, and all visitors share one TLE cache behind a lock so only one request re-downloads a stale file.",
      },
      {
        title: "The production outage",
        body: "After deploying, requests from Render's network to CelesTrak started timing out, so the live site couldn't get orbital data. I moved the download off the server: a GitHub Actions workflow fetches the six groups every 6 hours, checks each file actually contains TLEs, and publishes them to GitHub Pages, where the app reads them. If a download fails, the previous files stay up, and the app waits 5 minutes before retrying instead of hammering the source.",
      },
      {
        title: "A live view without SGP4 in the browser",
        body: "The page carries the server's SGP4 samples every 30 seconds and interpolates between them in east/north/up coordinates relative to the station, which stays smooth even straight overhead where azimuth can swing 180° in seconds. A test keeps the worst-case pointing error under 0.1°.",
      },
      {
        title: "Testing it like it matters",
        body: "135 offline tests run against a real CelesTrak TLE file and fixed start times, so results are deterministic. Web tests swap in the fixture with FastAPI dependency overrides, and CLI tests fail if anything tries to download. Pass predictions are cross-checked against independent brute-force sampling every 2 seconds over 48 hours: same passes, times within 3 seconds. CI runs pytest and mypy on every push.",
      },
    ],
    role: ["Solo project: I designed, built, tested, and deployed it."],
    // From the README's limitations. TODO: confirm with Aadi these are what he'd do next.
    next: [
      "Bring multi-satellite contact scheduling from the CLI to the web app.",
      "Compare more TLEs against successive NASA ephemerides to measure how accuracy falls off with TLE age.",
      "Model atmospheric refraction, and let the scheduler weigh pass quality and priority.",
    ],
  },
  {
    slug: "signmeup",
    name: "SignMeUp",
    tagline:
      "Turns the speech in a video into ASL, signed by an animated figure timed to the words.",
    tags: ["Python", "Flask", "Whisper", "Stanza", "MediaPipe", "React", "TypeScript", "pytest", "Fly.io"],
    award: "3rd place · HelloWorld 2025",
    live: "https://signmeup.fly.dev/",
    source: "https://github.com/Xenon757/SignMeUp",
    links: [
      { label: "Original team repo", href: "https://github.com/ShlokShar/SignMeUp" },
      { label: "Devpost", href: "https://devpost.com/software/signmeup-the-asl-subtitle" },
    ],
    // TODO: ask Aadi for teammates' names to credit them individually.
    team: "Team project: built at HelloWorld 2025, Purdue's largest hackathon for freshmen, by the SignMeUp team, where it won 3rd place. I've continued it in my own fork since.",
    thumbnail: {
      src: "/projects/signmeup-thumb.webp",
      alt: "SignMeUp landing page with an upload box and an animated signer performing the sign THANK-YOU.",
    },
    images: [
      {
        src: "/projects/signmeup-how.webp",
        alt: "SignMeUp's how-it-works steps (listen, translate, sign) and its explanation of why ASL and not just captions.",
        caption: "How it works, and why ASL rather than captions alone.",
      },
    ],
    problem: [
      "Captions are written English, but for many Deaf viewers ASL is their first language and English their second, so captions alone can mean watching in a second language. SignMeUp signs the speech in ASL and keeps the captions.",
    ],
    built: [
      "At the hackathon, the team built a Flask pipeline that transcribes video with Whisper and uses Stanza parsing to convert speech into ASL signs.",
      "Since then: upload a video or audio file and SignMeUp transcribes it with word timings, translates each sentence with ASL grammar rules, and signs it with a 2D animated figure in a corner of the video, like a TV interpreter.",
      "A demo that signs “Me at the zoo” (the first YouTube video) without uploading anything, and a compare page that plays any word's animation next to its source dictionary video.",
      "“Optimize for ASL,” which slows the video just enough that the signs fit comfortably.",
    ],
    how: [
      {
        title: "English → ASL translation rules",
        body: "Stanza parses each sentence (parts of speech, base forms, dependencies). Articles and forms of “to be” are dropped, words are signed in their base form, negation and quantifiers are always signed, question words move to the end, and names are fingerspelled. Words are only ever moved later, never earlier, because a sign can't play before its word has been spoken.",
      },
      {
        title: "From dictionary video to animated signer",
        body: "Each sign comes from an ASL Signbank video. MediaPipe tracks the body and hands, the clip is trimmed to just the part where the hands move, and points are smoothed over time, which cuts finger jitter by about two-thirds. When the tracker loses a hand behind the other, it's recovered by re-running the hand model on a zoomed-in crop.",
      },
      {
        title: "Keeping pace with speech",
        body: "When speech is slow enough, each sign starts within half a second of its word. In fast stretches it works like closed captions: a sentence's signs share the time until the next sentence, played at 1.5× and up to 3× when needed.",
      },
      {
        title: "Fixing a path-traversal bug",
        body: "The original upload handler used the uploaded filename as the file path, so a name like ../../app.py could write outside the upload folder. Uploads now get random storage names, size and type limits, and are deleted after processing, with a regression test for the exploit.",
      },
      {
        title: "Shipping it",
        body: "A Docker image bakes in the Whisper, Stanza, and MediaPipe models and runs on Fly.io, deployed by GitHub Actions after the Python and frontend tests pass. Models load at startup and the 858 signs for the most common English words are animated ahead of time, so uploads don't wait on cold starts. 130 Python tests and 11 frontend tests run offline.",
      },
    ],
    role: [
      "Member of the hackathon team that built the original version.",
      "After the hackathon, continued it on my own: fixed the path-traversal vulnerability and hardened uploads, split the pipeline into tested modules, built the animated signer and its timing, reworked the translation rules, rebuilt the frontend in React and TypeScript, and set up Docker, Fly.io, and CI/CD.",
    ],
    // TODO: ask Aadi what's next (CLAUDE.md previously said "better sign media", which the Signbank animations now address).
    next: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
