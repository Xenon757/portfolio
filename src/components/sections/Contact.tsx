import { ContactMotion } from "@/components/motion/SectionMotion";
import { LinkedInIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { BackToTopButton, CopyEmailButton } from "@/components/ui/ContactButtons";
import { site } from "@/data/site";

const headline = ["Have an", "opportunity", "in mind?"];

/** Site-wide footer: contact call to action, links, and credits. Server component. */
export function Contact() {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-line px-6 pt-24 pb-8 md:px-12 md:pt-32 md:pb-10"
    >
      <ContactMotion />
      <p data-contact-fade className="mb-6 flex items-center gap-3 text-xs tracking-[0.2em] text-muted uppercase">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
        Contact
      </p>

      <h2
        id="contact-heading"
        data-contact-heading
        className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] uppercase"
      >
        {headline.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.04em]">
            <span data-contact-line className={i === 1 ? "block text-accent" : "block"}>
              {line}
            </span>
            {i < headline.length - 1 && " "}
          </span>
        ))}
      </h2>

      <p data-contact-fade className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
        I&apos;m {site.status.charAt(0).toLowerCase() + site.status.slice(1)}. The quickest way to reach me is
        email.
      </p>

      <div data-contact-fade className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
        <a
          href={`mailto:${site.email}`}
          className="font-display text-3xl break-all uppercase underline decoration-line decoration-2 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent md:text-5xl"
        >
          {site.email}
        </a>
        <CopyEmailButton email={site.email} />
      </div>

      <div data-contact-fade className="mt-10 flex flex-wrap gap-3">
        <Button href={site.linkedin} external>
          <LinkedInIcon className="size-4" />
          LinkedIn
        </Button>
      </div>

      <div className="mt-24 flex flex-col gap-4 border-t border-line pt-6 text-xs tracking-[0.15em] text-muted uppercase md:mt-32 md:flex-row md:items-center md:justify-between">
        <p>Designed &amp; built by {site.name}</p>
        <p>{site.location}</p>
        <BackToTopButton />
      </div>
    </footer>
  );
}
