import type { Metadata } from "next";
import NameDirectory from "@/components/NameDirectory";
import Ornament from "@/components/Ornament";
import { boyNames } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Christian Boy Names with Meanings",
  description:
    "Browse Christian boy names with meanings, origins and Bible references. Filter A-Z to find the perfect name for your son.",
  alternates: { canonical: "/christian-boy-names" },
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
      <header className="text-center">
        <h1 className="text-4xl font-semibold text-oxblood sm:text-5xl">
          Christian Boy Names
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-xl italic text-ink-soft">
          {names.length} names for sons, each with its meaning and origin.
          Choose a letter, or read straight through.
        </p>
        <Ornament className="my-7" />
      </header>
      <NameDirectory names={names} />
    </main>
  );
}
