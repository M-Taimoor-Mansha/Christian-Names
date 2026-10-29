"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ALPHABET } from "@/lib/types";
import { Filter } from "lucide-react";

export interface DirectoryItem {
  slug: string;
  name: string;
  meaning: string;
  origin: string;
}

export default function NameDirectory({ names }: { names: DirectoryItem[] }) {
  const [letter, setLetter] = useState("ALL");
  const [query, setQuery] = useState("");

  const filteredNames = useMemo(() => {
    if (!query.trim()) return names;
    const q = query.toLowerCase().trim();
    return names.filter(
      (n) =>
        n.name.toLowerCase().includes(q) ||
        n.meaning.toLowerCase().includes(q) ||
        n.origin.toLowerCase().includes(q)
    );
  }, [names, query]);

  const groups = useMemo(() => {
    const map = new Map<string, DirectoryItem[]>();
    for (const n of filteredNames) {
      const l = n.name[0].toUpperCase();
      const list = map.get(l);
      if (list) list.push(n);
      else map.set(l, [n]);
    }
    return map;
  }, [filteredNames]);

  const shown = ALPHABET.filter(
    (l) => groups.has(l) && (letter === "ALL" || letter === l)
  );
  const visible = shown.flatMap((l) => groups.get(l) ?? []);
  const first = visible[0]?.name;
  const last = visible[visible.length - 1]?.name;

  return (
    <div>
      {/* Quick filter within this collection */}
      <div className="mx-auto mb-6 max-w-md text-left">
        <div className="flex items-center gap-2 rounded-lg border border-ink/20 bg-paper px-3.5 py-2 shadow-2xs focus-within:border-oxblood">
          <Filter className="h-4 w-4 text-ink-soft" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (letter !== "ALL") setLetter("ALL");
            }}
            placeholder="Filter within this list..."
            aria-label="Filter within this list"
            className="w-full bg-transparent text-base outline-none placeholder:text-ink-soft/70"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-xs font-semibold text-oxblood hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Thumb index (Letter filters) */}
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
              className={`min-w-9 border px-2 py-1 text-base transition-colors ${
                l === "ALL" ? "px-3" : ""
              } ${
                active
                  ? "border-oxblood bg-oxblood text-paper font-semibold"
                  : "border-ink/30 bg-paper hover:bg-paper-deep text-ink"
              } ${disabled ? "cursor-not-allowed opacity-30 hover:bg-paper" : ""}`}
            >
              {l === "ALL" ? "All" : l}
            </button>
          );
        })}
      </div>

      {/* Screen-reader live announcement */}
      <div aria-live="polite" className="sr-only">
        Showing {visible.length} names
        {letter !== "ALL" ? ` starting with letter ${letter}` : ""}
        {query ? ` matching "${query}"` : ""}.
      </div>

      {/* Guide words */}
      {first && last && (
        <p className="mb-8 border-y border-gold py-1 text-center text-base italic text-ink-soft">
          Showing {visible.length} names &bull; {first} &ndash; {last}
        </p>
      )}

      {visible.length === 0 && (
        <div className="my-12 text-center text-ink-soft">
          <p className="text-xl italic">No names found matching your filter.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setLetter("ALL");
            }}
            className="mt-3 text-base font-semibold text-oxblood underline"
          >
            Reset filters
          </button>
        </div>
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
                  className="block border-b border-ink/10 py-2.5 transition-colors hover:bg-paper-deep/80 px-1 rounded-sm"
                >
                  <span className="text-xl font-semibold text-oxblood">
                    {n.name}
                  </span>{" "}
                  <span className="text-base italic text-ink-soft">
                    ({n.origin})
                  </span>
                  <span className="block text-lg text-ink">{n.meaning}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
