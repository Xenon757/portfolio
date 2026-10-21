import type { Metadata } from "next";
import { Anton, Geist } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Menu } from "@/components/ui/Menu";
import { site } from "@/data/site";
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
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <a
          href="#main"
          className="fixed top-4 left-4 z-[60] -translate-y-24 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Menu />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
