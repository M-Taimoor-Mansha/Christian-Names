import type { Metadata } from "next";
import Link from "next/link";
import NameDirectory from "@/components/NameDirectory";
import Ornament from "@/components/Ornament";
import { girlNames, SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Christian Girl Names: Meanings, Origins & Bible References",
  description:
    "Browse Christian girl names with authentic meanings, linguistic origins, pronunciations, and Bible references. Filter A-Z to find the perfect name for your daughter.",
  alternates: { canonical: "/christian-girl-names" },
  openGraph: {
    title: "Christian Girl Names: Meanings, Origins & Bible References",
    description:
      "Explore names for daughters across Hebrew, Greek, Latin, and historical Christian traditions.",
    url: `${SITE_URL}/christian-girl-names`,
  },
};

export default function GirlNamesPage() {
  const names = [...girlNames]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ slug, name, meaning, origin }) => ({
      slug,
      name,
      meaning,
      origin,
    }));

  return (
    <main className="py-4">
      <nav aria-label="Breadcrumb" className="mb-6 text-base italic text-ink-soft">
        <Link href="/" className="hover:text-oxblood hover:underline">
          Home
        </Link>
        {" / "}
        <span className="text-oxblood font-medium">Christian Girl Names</span>
      </nav>

      <header className="text-center">
        <span className="smcp text-base font-semibold tracking-widest text-gold">
          Daughters of Grace &amp; Faith
        </span>
        <h1 className="mt-1 text-4xl font-semibold text-oxblood sm:text-5xl">
          Christian Girl Names
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-xl italic text-ink-soft">
          {names.length} names for daughters, each with its verified meaning, linguistic root, and biblical context.
        </p>
        <Ornament className="my-7" />
      </header>
      <NameDirectory names={names} />
    </main>
  );
}
