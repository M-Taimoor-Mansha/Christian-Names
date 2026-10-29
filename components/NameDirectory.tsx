"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ALPHABET } from "@/lib/types";

export interface DirectoryItem {
  slug: string;
  name: string;
  meaning: string;
  origin: string;
}

export default function NameDirectory({ names }: { names: DirectoryItem[] }) {
  const [letter, setLetter] = useState("ALL");

  const groups = useMemo(() => {
    const map = new Map<string, DirectoryItem[]>();
    for (const n of names) {
      const l = n.name[0].toUpperCase();
      const list = map.get(l);
      if (list) list.push(n);
      else map.set(l, [n]);
    }
    return map;
  }, [names]);

  const shown = ALPHABET.filter(
    (l) => groups.has(l) && (letter === "ALL" || letter === l),
  );
  const visible = shown.flatMap((l) => groups.get(l) ?? []);
  const first = visible[0]?.name;
  const last = visible[visible.length - 1]?.name;

  return (
    <div>
      {/* Thumb index */}
      <div
        role="group"
        aria-label="Filter by letter"
        className="mb-6 flex flex-wrap justify-center gap-1"
      >
        {["ALL", ...ALPHABET].map((l) => {
          const disabled = l !== "ALL" && !groups.has(l);
          const active = letter === l;
          return (
            <button
              key={l}
              type="button"
              disabled={disabled}
              aria-pressed={active}
              onClick={() => setLetter(l)}
              className={`min-w-9 border px-2 py-1 text-base ${
                l === "ALL" ? "px-3" : ""
              } ${
                active
                  ? "border-oxblood bg-oxblood text-paper"
                  : "border-ink/30 bg-paper hover:bg-paper-deep"
              } ${disabled ? "cursor-not-allowed opacity-30 hover:bg-paper" : ""}`}
            >
              {l === "ALL" ? "All" : l}
            </button>
          );
        })}
      </div>

      {/* Guide words */}
      {first && last && (
        <p className="mb-8 border-y border-gold py-1 text-center text-base italic text-ink-soft">
          {first} – {last}
        </p>
      )}

      {/* Entries, grouped by letter */}
      {shown.map((l) => (
        <section key={l} aria-labelledby={`letter-${l}`} className="mb-10">
          <h2
            id={`letter-${l}`}
            className="mb-3 flex items-center gap-4 text-4xl font-semibold text-oxblood"
          >
            {l}
            <span className="h-px flex-1 bg-gold/70" aria-hidden />
          </h2>
          <ul className="dict-columns">
            {(groups.get(l) ?? []).map((n) => (
              <li key={n.slug} className="break-inside-avoid">
                <Link
                  href={`/names/${n.slug}`}
                  className="block border-b border-ink/10 py-2 hover:bg-paper-deep"
                >
                  <span className="text-xl font-semibold text-oxblood">
                    {n.name}
                  </span>{" "}
                  <span className="text-base italic text-ink-soft">
                    {n.origin}
                  </span>
                  <span className="block text-lg">{n.meaning}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
