import type { Metadata } from "next";
import NameDirectory from "@/components/NameDirectory";
import Ornament from "@/components/Ornament";
import { girlNames } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Christian Girl Names with Meanings",
  description:
    "Browse Christian girl names with meanings, origins and Bible references. Filter A-Z to find the perfect name for your daughter.",
  alternates: { canonical: "/christian-girl-names" },
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
      <header className="text-center">
        <h1 className="text-4xl font-semibold text-oxblood sm:text-5xl">
          Christian Girl Names
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-xl italic text-ink-soft">
          {names.length} names for daughters, each with its meaning and origin.
          Choose a letter, or read straight through.
        </p>
        <Ornament className="my-7" />
      </header>
      <NameDirectory names={names} />
    </main>
  );
}
