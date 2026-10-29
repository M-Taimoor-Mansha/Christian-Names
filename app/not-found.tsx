import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Ornament from "@/components/Ornament";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl py-12 text-center">
      <span className="smcp text-base font-semibold tracking-widest text-gold">
        404 &bull; Missing Entry
      </span>
      <h1 className="mt-2 text-4xl font-semibold text-oxblood sm:text-5xl">
        Name Not Found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-xl italic text-ink-soft">
        We could not find the dictionary entry you were seeking. It may have moved or is not yet recorded in our reference.
      </p>

      <Ornament className="my-8" />

      <div className="my-6">
        <p className="mb-3 text-base text-ink font-medium">Search our dictionary:</p>
        <SearchBar />
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4 text-base">
        <Link
          href="/"
          className="rounded border border-ink/20 bg-paper px-4 py-2 font-medium text-ink hover:border-oxblood hover:bg-paper-deep"
        >
          Return Home
        </Link>
        <Link
          href="/christian-boy-names"
          className="rounded border border-ink/20 bg-paper px-4 py-2 font-medium text-oxblood hover:border-oxblood hover:bg-paper-deep"
        >
          Browse Boy Names
        </Link>
        <Link
          href="/christian-girl-names"
          className="rounded border border-ink/20 bg-paper px-4 py-2 font-medium text-oxblood hover:border-oxblood hover:bg-paper-deep"
        >
          Browse Girl Names
        </Link>
        <Link
          href="/biblical-names"
          className="rounded border border-gold/60 bg-gold/10 px-4 py-2 font-medium text-ink hover:bg-gold/20"
        >
          Biblical Names
        </Link>
      </div>
    </main>
  );
}

