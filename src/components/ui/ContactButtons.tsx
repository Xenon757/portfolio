"use client";

import { ArrowUp, Check, Copy } from "lucide-react";
import { useState } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context): the mailto link still works.
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-xs tracking-wide text-muted transition-colors hover:border-fg hover:text-fg"
      >
        {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        {copied ? "Copied" : "Copy email"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  );
}

export function BackToTopButton() {
  const { scrollTo } = useSmoothScroll();
  return (
    <button
      type="button"
      onClick={() => scrollTo("top")}
      className="inline-flex items-center gap-2 self-start uppercase transition-colors hover:text-fg md:self-auto"
    >
      Back to top
      <ArrowUp className="size-3.5" aria-hidden="true" />
    </button>
  );
}
