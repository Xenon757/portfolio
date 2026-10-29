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
  /** Heading for `next` (default "What's next"). */
  nextTitle?: string;
};

export const projects: Project[] = [
  // Order matters: SignMeUp first (Aadi's strongest), then Tessera, then OrbitTrack; in-progress Modulos last.
  {
    slug: "signmeup",
    name: "SignMeUp",
    tagline:
      "Turns the speech in a video into ASL, signed by an animated figure timed to the words, on its own site and on YouTube through a Chrome extension.",
    tags: ["Python", "Flask", "Whisper", "Stanza", "MediaPipe", "React", "TypeScript", "Chrome Extension", "pytest", "Fly.io"],
    award: "3rd place · HelloWorld 2025",
    live: "https://signmeup.fly.dev/",
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/signmeup-asl-for-youtube/jehdimfnbbfahecpbdlchaciioibpkkp",
      },
      { label: "Original team repo", href: "https://github.com/ShlokShar/SignMeUp" },
      { label: "Devpost", href: "https://devpost.com/software/signmeup-the-asl-subtitle" },
    ],
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
      "A Chrome extension, published on the Chrome Web Store, that signs whatever YouTube video you're watching from its own English captions, with the signer in a corner of YouTube's player.",
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
        title: "Signing two-hour videos on YouTube",
        body: "Transcribing a long video before it plays isn't an option, so the extension never does. It reads the video's own captions (auto-generated ones time each word), and the server signs one minute at a time starting where you are, keeping up to four minutes ahead and starting over after a seek. Every one of the 3,509 Signbank signs with a video is animated ahead of time, and signed chunks are cached on the server, so a popular video is only translated once.",
      },
      {
        title: "Fixing a path-traversal bug",
        body: "The original upload handler used the uploaded filename as the file path, so a name like ../../app.py could write outside the upload folder. Uploads now get random storage names, size and type limits, and are deleted after processing, with a regression test for the exploit.",
      },
      {
        title: "Shipping it",
        body: "A Docker image bakes in the Whisper, Stanza, and MediaPipe models and runs on Fly.io, deployed by GitHub Actions after the Python and frontend tests pass. Models load at startup and the 858 signs for the most common English words are animated ahead of time, so uploads don't wait on cold starts. 149 Python tests and 21 TypeScript tests for the site and the extension run offline.",
      },
    ],
    role: [
      "Member of the hackathon team that built the original version.",
      "After the hackathon, continued it on my own: fixed the path-traversal vulnerability and hardened uploads, split the pipeline into tested modules, built the animated signer and its timing, reworked the translation rules, rebuilt the frontend in React and TypeScript, built and published the Chrome extension, and set up Docker, Fly.io, and CI/CD.",
    ],
    // Aadi (Oct 2026): fine as is — team credited as a group, no "What's next".
    next: [],
  },
  {
    slug: "tessera",
    name: "Tessera",
    tagline:
      "A real-time 3D software rasterizer written from scratch in C++, with no GPU API, plus a Blender-style editor that runs in the browser via WebAssembly.",
    tags: ["C++17", "WebAssembly", "SIMD", "Multithreading", "CMake", "SDL2", "JavaScript", "Cloudflare Workers", "Claude API"],
    live: "https://xenon757.github.io/tessera/",
    liveNote: "The editor runs entirely in your browser. On the first visit it reloads once to turn on multithreading.",
    thumbnail: {
      src: "/projects/tessera-thumb.webp",
      alt: "Tessera's web editor showing a Liquid Sort-style liquid tube with a move gizmo, an outliner, a keyframe timeline, and a properties panel.",
    },
    images: [
      {
        src: "/projects/tessera-bunny.webp",
        alt: "The Stanford bunny (69,451 triangles) imported into the Tessera editor with smooth Phong shading.",
        caption: "The Stanford bunny (69,451 triangles), imported as an OBJ and shaded per pixel.",
      },
      {
        src: "/projects/tessera-ps1.webp",
        alt: "The same bunny in Tessera's PS1 mode, with low-resolution pixels and dithered color.",
        caption: "PS1 mode: vertex snapping, 15-bit dithered color, and a low-res upscale, each a separate setting.",
      },
    ],
    problem: [
      "Graphics APIs like OpenGL, Vulkan, and Metal hand the hard parts of rendering to the GPU. Tessera does every stage of the pipeline on the CPU, by hand, from clipping and rasterization to depth testing and shading, then builds a full 3D editor on top of it that runs in a browser tab.",
    ],
    built: [
      "The whole rendering pipeline: near-plane clipping, perspective-correct interpolation, a top-left fill rule (exactly one triangle owns every pixel, verified on 460k pixels), z-buffering, flat/Gouraud/Phong shading, and bilinear textures.",
      "Tiled, multithreaded rasterization on a custom thread pool: 4.6× faster on 8 cores (6.1× when pixel-bound), with byte-identical output at any thread count.",
      "An ARM NEON SIMD pixel loop (1.6× faster on large triangles) that runs in the browser as WebAssembly SIMD (1.75×), alongside WebAssembly threads (4× on the bunny), with frames that match native byte for byte.",
      "A Blender-style editor: scene graph, edit-mode modeling (extrude, inset, bevel, loop cut), keyframe animation on a timeline, grouped undo/redo, saved scenes, and PNG and video export.",
      "OBJ and binary FBX import, with an FBX reader and zlib decompressor written from scratch (FBX 5 through 7.7, fuzzed with 30,000 corrupted files).",
      "Programmable vertex and pixel shaders, a Liquid Sort-style liquid demo built on them, and a PS1 mode where every quirk of the console is its own setting.",
      "An AI chat that edits the scene from plain English, with Claude calling the editor's own commands as tools.",
    ],
    how: [
      {
        title: "Two parallel passes, no locks",
        body: "A geometry pass runs vertex, clip, project, and cull in parallel over chunks of the mesh and bins triangles into 64-pixel screen tiles; a raster pass then shades the tiles in parallel. Tiles never overlap, so raster threads need no locks, and each tile draws its triangles in submission order, which keeps the image identical at any thread count. A profile showed about 60% of the frame in rasterization and 37% in geometry, so both passes run in parallel; threading only one would cap the speedup under 3×.",
      },
      {
        title: "SIMD that draws the same pixels",
        body: "The NEON loop shades four pixels per instruction. Floating-point contraction is turned off so the SIMD and scalar loops do identical IEEE operations, and a test checks their images match byte for byte, which also makes it safe to choose a loop per triangle (thin ones stay scalar). Emscripten translates the same intrinsics to WebAssembly SIMD, so the browser draws the same pixels as an ARM Mac.",
      },
      {
        title: "Threads on GitHub Pages",
        body: "WebAssembly threads need SharedArrayBuffer, which browsers only allow on cross-origin isolated pages, and that takes response headers GitHub Pages can't send. A small service worker adds them: the first visit registers it and reloads once, and if isolation isn't possible the page loads a single-threaded build that draws the same pixels.",
      },
      {
        title: "An editor that never touches the pixel loop",
        body: "Every change is a JSON command that is validated first and records its exact inverse, so undo replays inverses and a drag or a field edit can be one grouped step. The web UI, the desktop window, and the AI chat all edit the scene through that one path. A test checks that rendering a scene is byte-identical to drawing its meshes directly.",
      },
      {
        title: "AI chat without exposing the key",
        body: "A small Cloudflare Worker holds the Claude API key and fixes the model, instructions, and tool list; it also checks the page's origin, rate-limits each visitor, and caps request and reply sizes. The agent loop runs in the page, and every tool call goes through the same validated commands as the UI, so bad edits are rejected and sent back for Claude to fix. One reply is one undo step.",
      },
      {
        title: "Testing it",
        body: "17 CTest tests cover golden-image hashes (scalar, NEON, and threaded output must match), a randomized chain of 600 modeling operations checked for closed, outward-facing meshes, the PNG encoder and zlib decoder against Python's zlib, and FBX loading against reference exports. Fuzzing under AddressSanitizer and UBSan caught two unchecked sizes, now fixed, and CI runs both the normal and sanitizer builds on every push.",
      },
    ],
    role: ["Solo project: I designed, built, tested, and deployed it."],
    next: [],
  },
  {
    slug: "orbittrack",
    name: "OrbitTrack",
    tagline:
      "Predicts when satellites pass over any ground station, with rise, peak and set times, sky paths and ground tracks, as a web app, JSON API and CLI.",
    tags: ["Python", "Skyfield", "FastAPI", "pytest", "mypy", "GitHub Actions", "Render"],
    live: "https://orbittrack-dpeo.onrender.com/",
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
    // Confirmed by Aadi (Oct 2026): already working on these.
    nextTitle: "What I'm working on",
    next: [
      "Bring multi-satellite contact scheduling from the CLI to the web app.",
      "Compare more TLEs against successive NASA ephemerides to measure how accuracy falls off with TLE age.",
      "Model atmospheric refraction, and let the scheduler weigh pass quality and priority.",
    ],
  },
  {
    slug: "modulos",
    name: "Modulos",
    tagline:
      "A personal debt-management companion: check whether a new loan is affordable and plan the fastest way out of debt.",
    tags: ["TypeScript", "React", "AWS Amplify", "Cognito", "AppSync", "DynamoDB", "Lambda", "Plaid"],
    status: "in-progress",
    live: "https://www.modulos.app/",
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
    // Aadi: still in development, no specific roadmap to list.
    next: ["Modulos is still in development. You can try it without an account in guest mode at modulos.app."],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
