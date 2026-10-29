"use client";

import { useEffect, useState } from "react";
import { Heart, X, ExternalLink } from "lucide-react";
import { sanitizeUrl } from "@/lib/utils";

const AMOUNTS = [3, 5, 10];
const RAW_DONATE_URL = process.env.NEXT_PUBLIC_DONATE_URL;
const DONATE_URL = sanitizeUrl(RAW_DONATE_URL);

export default function DonationModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function donate(amount: number) {
    setError("");
    setLoading(amount);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? "Card donations are not configured yet. Please consider supporting via Buy Me a Coffee.");
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError("Unable to initialize checkout. Please try again or use the support link below.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded border border-gold/70 px-3 py-1.5 text-sm font-medium text-gold hover:bg-gold/15 focus-visible:outline-2 focus-visible:outline-gold"
      >
        <Heart className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">Support Us</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="donate-title"
            className="relative w-full max-w-md rounded-xl border border-gold/40 bg-paper p-6 text-ink shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close dialog"
              className="absolute right-4 top-4 rounded-full p-1.5 text-ink-soft hover:bg-paper-deep focus-visible:outline-2 focus-visible:outline-oxblood"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 id="donate-title" className="text-2xl font-semibold text-oxblood">
              Support Christian Names
            </h2>
            <p className="mt-2 text-base text-ink-soft">
              Christian Names is a 100% free, open dictionary for parents and researchers worldwide. We have no paywalls or user accounts. Voluntary gifts help cover research, hosting, and continuous reference maintenance.
            </p>

            <div className="mt-6">
              <span className="block text-sm font-medium text-ink-soft">
                Optional quick gift:
              </span>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    disabled={loading !== null}
                    onClick={() => donate(a)}
                    className="rounded border border-ink/25 bg-white py-2 font-semibold text-oxblood hover:border-oxblood hover:bg-paper-deep disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-oxblood"
                  >
                    {loading === a ? "..." : `$${a}`}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="mt-3 rounded bg-red-50 p-2 text-sm text-red-700 border border-red-200">
                {error}
              </p>
            )}

            {DONATE_URL && (
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 rounded bg-gold px-4 py-2.5 text-center font-medium text-cloth shadow-sm transition-colors hover:bg-gold/90 focus-visible:outline-2 focus-visible:outline-cloth"
              >
                <span>Support via Buy Me a Coffee</span>
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            )}

            <p className="mt-4 text-center text-xs text-ink-soft">
              Voluntary contributions are non-tax-deductible personal gifts.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
