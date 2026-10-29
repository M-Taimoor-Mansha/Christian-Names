"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { fuseOptions, type SearchItem } from "@/lib/types";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const fuseRef = useRef<Fuse<SearchItem> | null>(null);
  const loadingRef = useRef<Promise<void> | null>(null);

  async function ensureIndex() {
    if (fuseRef.current) return;
    if (!loadingRef.current) {
      loadingRef.current = fetch("/search-index.json")
        .then((r) => r.json())
        .then((data: SearchItem[]) => {
          fuseRef.current = new Fuse(data, fuseOptions);
        })
        .catch(() => {
          loadingRef.current = null;
        });
    }
    await loadingRef.current;
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      return;
    }
    await ensureIndex();
    const found = fuseRef.current?.search(value.trim(), { limit: 8 }) ?? [];
    setResults(found.map((r) => r.item));
  }

  return (
    <div className="relative mx-auto w-full max-w-xl text-left">
      <div className="flex items-center gap-2 rounded-full border border-ink/25 bg-white px-5 py-3 shadow-sm focus-within:border-oxblood">
        <Search className="h-5 w-5 text-ink-soft" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={handleChange}
          onFocus={ensureIndex}
          placeholder="Search a name or meaning..."
          aria-label="Search Christian names"
          className="w-full bg-transparent text-lg outline-none placeholder:text-ink-soft/70"
        />
      </div>

      {results.length > 0 && (
        <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-ink/20 bg-white shadow-lg">
          {results.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/names/${item.slug}`}
                className="flex flex-col px-5 py-3 hover:bg-paper-deep"
              >
                <span className="text-lg font-semibold text-oxblood">
                  {item.name}{" "}
                  <span className="text-sm font-normal italic text-ink-soft">
                    ({item.gender === "boy" ? "boy" : "girl"})
                  </span>
                </span>
                <span className="truncate text-base text-ink-soft">
                  {item.meaning}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
