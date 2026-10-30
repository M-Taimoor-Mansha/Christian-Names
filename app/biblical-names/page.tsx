import type { Metadata } from "next";
import Link from "next/link";
import NameDirectory from "@/components/NameDirectory";
import Ornament from "@/components/Ornament";
import { getBiblicalNames, SITE_URL } from "@/lib/utils";

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

  const pageUrl = `${SITE_URL}/biblical-names`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Biblical Names: Baby Name Meanings, Verses & Scripture References",
        description:
          "Browse biblical baby names directly recorded in Scripture with chapter and verse references, Hebrew and Greek meanings, and faith-filled stories.",
        inLanguage: "en",
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Biblical Names",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="py-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-base italic text-ink-soft">
        <Link href="/" className="hover:text-oxblood hover:underline">
          Home
        </Link>
        {" / "}
        <span className="text-oxblood font-medium">Biblical Names</span>
      </nav>
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

