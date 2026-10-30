import type { Metadata } from "next";
import Link from "next/link";
import Ornament from "@/components/Ornament";
import { allNames, SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Christian Names by Linguistic Origin - Hebrew, Latin, Greek & More",
  description:
    "Explore Christian baby names categorized by their linguistic and historical origin, including Hebrew, Greek, Latin, Aramaic, and European traditions.",
  alternates: { canonical: "/origins" },
  openGraph: {
    title: "Christian Names by Linguistic Origin",
    description:
      "Browse Christian baby names by etymological origin and linguistic heritage.",
    url: `${SITE_URL}/origins`,
  },
};

export default function OriginsIndexPage() {
  const originCounts = allNames.reduce<Record<string, number>>((acc, n) => {
    const o = n.origin.trim();
    acc[o] = (acc[o] || 0) + 1;
    return acc;
  }, {});

  const sortedOrigins = Object.entries(originCounts).sort((a, b) =>
    b[1] - a[1] || a[0].localeCompare(b[0])
  );

  const pageUrl = `${SITE_URL}/origins`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Christian Names by Linguistic Origin - Hebrew, Latin, Greek & More",
        description:
          "Explore Christian baby names categorized by their linguistic and historical origin, including Hebrew, Greek, Latin, Aramaic, and European traditions.",
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
            name: "Linguistic Origins",
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
        <span className="text-oxblood font-medium">Linguistic Origins</span>
      </nav>

      <header className="text-center">
        <span className="smcp text-base font-semibold tracking-widest text-gold">
          Etymological Lexicon
        </span>
        <h1 className="mt-1 text-4xl font-semibold text-oxblood sm:text-5xl">
          Christian Names by Origin
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-xl italic text-ink-soft">
          Explore our dictionary of 3,000 Christian names categorized across {sortedOrigins.length} distinct linguistic heritages and biblical traditions.
        </p>
        <Ornament className="my-7" />
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {sortedOrigins.map(([origin, count]) => (
          <Link
            key={origin}
            href={`/origins/${origin.toLowerCase()}`}
            className="group flex items-center justify-between rounded-lg border border-ink/20 bg-paper p-4 transition-all hover:border-oxblood hover:bg-paper-deep hover:shadow-xs"
          >
            <div>
              <span className="text-xl font-semibold text-oxblood group-hover:underline">
                {origin}
              </span>
              <p className="text-sm italic text-ink-soft">
                {count} {count === 1 ? "entry" : "entries"}
              </p>
            </div>
            <span className="text-lg font-serif text-gold">&rarr;</span>
          </Link>
        ))}
      </div>
    </main>
  );
}

