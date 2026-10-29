import type { Metadata } from "next";
import NameDirectory from "@/components/NameDirectory";
import Ornament from "@/components/Ornament";
import { getBiblicalNames } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Biblical Names: Baby Names with Scripture References",
  description:
    "Explore Christian baby names found in the Holy Bible with verified chapter-and-verse scripture references, Hebrew and Greek origins, and profound meanings.",
  alternates: { canonical: "/biblical-names" },
};

export default function BiblicalNamesPage() {
  const biblicalNames = getBiblicalNames()
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
        <span className="smcp text-base font-semibold tracking-widest text-gold">
          Canonical Scripture
        </span>
        <h1 className="mt-1 text-4xl font-semibold text-oxblood sm:text-5xl">
          Biblical Baby Names
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-xl italic text-ink-soft">
          {biblicalNames.length} names occurring directly in the Old and New Testaments, each with its verified biblical significance and meaning.
        </p>
        <Ornament className="my-7" />
      </header>

      <NameDirectory names={biblicalNames} />
    </main>
  );
}

