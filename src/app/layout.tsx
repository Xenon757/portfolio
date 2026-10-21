import type { Metadata } from "next";
import { Anton, Geist } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Contact } from "@/components/sections/Contact";
import { Cursor } from "@/components/ui/Cursor";
import { DotField } from "@/components/ui/DotField";
import { Intro } from "@/components/ui/Intro";
import { Menu } from "@/components/ui/Menu";
import { site } from "@/data/site";
import { INTRO_SEEN_KEY } from "@/lib/intro";
import "./globals.css";

const display = Anton({
  variable: "--font-display-face",
  weight: "400",
  subsets: ["latin"],
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

// Runs before first paint. Adds "js-anim" so the hero stays hidden until GSAP
// animates it in (instead of flashing server-rendered text), and "intro" on the
// first visit of a session so the intro overlay covers the page immediately.
// Fails open: no JS or reduced motion means no classes, and the timeout clears
// them regardless (GSAP has taken over with inline styles by then).
const revealGuard = `(function(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;var d=document.documentElement;d.classList.add("js-anim");try{if(!sessionStorage.getItem("${INTRO_SEEN_KEY}"))d.classList.add("intro")}catch(e){}var t=function(){setTimeout(function(){d.classList.remove("js-anim","intro")},4000)};if(document.hidden){document.addEventListener("visibilitychange",function v(){if(!document.hidden){document.removeEventListener("visibilitychange",v);t()}})}else t()}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealGuard }} />
      </head>
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <a
          href="#main"
          className="fixed top-4 left-4 z-[60] -translate-y-24 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg focus:translate-y-0"
        >
          Skip to content
        </a>
        <DotField />
        <Cursor />
        <SmoothScroll>
          <Intro />
          <Menu />
          {children}
          <Contact />
        </SmoothScroll>
      </body>
    </html>
  );
}
