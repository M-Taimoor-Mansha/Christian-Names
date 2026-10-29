"use client";

import { useEffect, useState } from "react";
import { Heart, X } from "lucide-react";

const AMOUNTS = [3, 5, 10];
const DONATE_URL = process.env.NEXT_PUBLIC_DONATE_URL;

export default function DonationModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
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
        setError(data.error ?? "Card donations are not available right now.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded border border-gold/60 px-3 py-1.5 text-sm text-gold hover:bg-gold/10"
      >
        <Heart className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">Support us</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="donate-title"
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full p-1 text-gray-500 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 id="donate-title" className="text-xl font-semibold">
              Support Christian Names
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              This site is free for everyone. If it helped you find a name, a
              small gift helps us keep it running and growing.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  type="button"
                  disabled={loading !== null}
                  onClick={() => donate(a)}
                  className="rounded-lg border border-gray-300 py-2 font-medium hover:border-indigo-500 hover:bg-indigo-50 disabled:opacity-50"
                >
                  {loading === a ? "..." : `$${a}`}
                </button>
              ))}
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            {DONATE_URL && (
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block rounded-lg bg-yellow-400 py-2 text-center font-medium text-gray-900 hover:bg-yellow-300"
              >
                Buy us a coffee
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
