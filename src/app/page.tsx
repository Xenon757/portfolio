import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import { experience } from "@/data/experience";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Projects />
      <About />
      <Stack />
      <Experience items={experience} />
    </main>
  );
}
