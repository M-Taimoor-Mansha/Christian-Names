"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, X, Loader2 } from "lucide-react";
import { fuseOptions, type SearchItem } from "@/lib/types";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fuseRef = useRef<Fuse<SearchItem> | null>(null);
  const loadingPromiseRef = useRef<Promise<void> | null>(null);

  async function ensureIndex() {
    if (fuseRef.current) return;
    if (!loadingPromiseRef.current) {
      setLoading(true);
      loadingPromiseRef.current = fetch("/search-index.json")
        .then((r) => r.json())
        .then((data: SearchItem[]) => {
          fuseRef.current = new Fuse(data, fuseOptions);
        })
        .catch((err) => {
          console.error("Failed to load search index:", err);
          loadingPromiseRef.current = null;
        })
        .finally(() => {
          setLoading(false);
        });
    }
    await loadingPromiseRef.current;
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    if (value.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    await ensureIndex();
    const found = fuseRef.current?.search(value.trim(), { limit: 8 }) ?? [];
    const items = found.map((r) => r.item);
    setResults(items);
    setIsOpen(items.length > 0);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (selected) {
        setIsOpen(false);
        router.push(`/names/${selected.slug}`);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }

  // Dismiss on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-xl text-left"
    >
      <div className="flex items-center gap-2 rounded-full border border-ink/25 bg-paper px-5 py-3 shadow-sm transition-all focus-within:border-oxblood focus-within:ring-2 focus-within:ring-oxblood/20">
        <Search className="h-5 w-5 text-ink-soft" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="search-results-list"
          value={query}
          onChange={handleChange}
          onFocus={() => {
            ensureIndex();
            if (results.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search a name or meaning (e.g., Aaron, Grace, Beloved)..."
          aria-label="Search Christian names dictionary"
          className="w-full bg-transparent text-lg outline-none placeholder:text-ink-soft/70"
        />
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin text-ink-soft" aria-hidden />
        )}
        {query && !loading && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search query"
            className="rounded-full p-1 text-ink-soft hover:bg-paper-deep"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul
          id="search-results-list"
          role="listbox"
          className="absolute z-40 mt-2 w-full overflow-hidden rounded-xl border border-gold/40 bg-paper shadow-xl"
        >
          {results.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <li
                key={item.slug}
                role="option"
                aria-selected={isSelected}
                className={isSelected ? "bg-paper-deep" : ""}
              >
                <Link
                  href={`/names/${item.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col px-5 py-3 transition-colors hover:bg-paper-deep"
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
            );
          })}
        </ul>
      )}
    </div>
  );
}
