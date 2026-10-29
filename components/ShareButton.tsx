"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface ShareButtonProps {
  name: string;
  meaning: string;
  url: string;
}

export default function ShareButton({ name, meaning, url }: ShareButtonProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedName, setCopiedName] = useState(false);

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${name} - Christian Name Meaning`,
          text: `Discover the meaning of the Christian name ${name}: "${meaning}"`,
          url: url,
        });
        return;
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          await copyLink();
        }
      }
    } else {
      await copyLink();
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  }

  async function copyNameOnly() {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(true);
      setTimeout(() => setCopiedName(false), 2500);
    } catch {
      // Fallback
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
      <button
        type="button"
        onClick={handleShare}
        aria-label={`Share ${name}`}
        className="inline-flex items-center gap-1.5 rounded border border-ink/20 bg-paper px-3 py-1.5 font-medium text-ink transition-colors hover:border-oxblood hover:bg-paper-deep focus-visible:outline-2 focus-visible:outline-oxblood"
      >
        {copiedLink ? (
          <>
            <Check className="h-4 w-4 text-emerald-700" aria-hidden />
            <span className="text-emerald-800">Link copied!</span>
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4 text-oxblood" aria-hidden />
            <span>Share</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={copyNameOnly}
        aria-label={`Copy ${name} to clipboard`}
        className="inline-flex items-center gap-1.5 rounded border border-ink/20 bg-paper px-3 py-1.5 font-medium text-ink-soft transition-colors hover:border-oxblood hover:bg-paper-deep focus-visible:outline-2 focus-visible:outline-oxblood"
      >
        {copiedName ? (
          <>
            <Check className="h-4 w-4 text-emerald-700" aria-hidden />
            <span className="text-emerald-800">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 text-ink-soft" aria-hidden />
            <span>Copy name</span>
          </>
        )}
      </button>

      <div aria-live="polite" className="sr-only">
        {copiedLink && "Link copied to clipboard"}
        {copiedName && "Name copied to clipboard"}
      </div>
    </div>
  );
}

