import type { Metadata } from "next";
import { Anton, Geist } from "next/font/google";
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
        {children}
      </body>
    </html>
  );
}
