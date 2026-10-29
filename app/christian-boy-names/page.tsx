import type { Metadata } from "next";
import Link from "next/link";
import NameDirectory from "@/components/NameDirectory";
import Ornament from "@/components/Ornament";
import { boyNames, SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Christian Boy Names: Meanings, Origins & Bible References",
  description:
    "Browse Christian boy names with authentic meanings, linguistic origins, pronunciations, and Bible references. Filter A-Z to find the perfect name for your son.",
  alternates: { canonical: "/christian-boy-names" },
  openGraph: {
    title: "Christian Boy Names: Meanings, Origins & Bible References",
    description:
      "Explore names for sons across Hebrew, Greek, Latin, and historical Christian traditions.",
    url: `${SITE_URL}/christian-boy-names`,
  },
};

export default function BoyNamesPage() {
  const names = [...boyNames]
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
        <span className="text-oxblood font-medium">Christian Boy Names</span>
      </nav>

      <header className="text-center">
        <span className="smcp text-base font-semibold tracking-widest text-gold">
          Sons of Faith &amp; Heritage
        </span>
        <h1 className="mt-1 text-4xl font-semibold text-oxblood sm:text-5xl">
          Christian Boy Names
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-xl italic text-ink-soft">
          {names.length} names for sons, each with its verified meaning, linguistic root, and biblical context.
        </p>
        <Ornament className="my-7" />
      </header>
      <NameDirectory names={names} />
    </main>
  );
}
