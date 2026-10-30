import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import NameDirectory from "@/components/NameDirectory";
import Ornament from "@/components/Ornament";
import { allNames, getNamesByOrigin, SITE_URL } from "@/lib/utils";

type Props = { params: Promise<{ origin: string }> };

export function generateStaticParams() {
  const origins = Array.from(
    new Set(allNames.map((n) => n.origin.toLowerCase()))
  );
  return origins.map((origin) => ({ origin }));
}

function formatOriginName(origin: string): string {
  return decodeURIComponent(origin)
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { origin } = await params;
  const capital = formatOriginName(origin);
  return {
    title: `Christian Names of ${capital} Origin with Meanings`,
    description: `Discover Christian baby names of ${capital} origin, with verified linguistic meanings, historical background, and Bible references.`,
    alternates: { canonical: `/origins/${origin}` },
    openGraph: {
      title: `${capital} Christian Names - Meanings & Origins`,
      description: `Explore Christian baby names rooted in ${capital} linguistic heritage.`,
      url: `${SITE_URL}/origins/${origin}`,
    },
  };
}

export default async function OriginPage({ params }: Props) {
  const { origin } = await params;
  const decoded = decodeURIComponent(origin);
  const capital = formatOriginName(origin);

  const names = getNamesByOrigin(decoded)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ slug, name, meaning, origin }) => ({
      slug,
      name,
      meaning,
      origin,
    }));

  if (names.length === 0) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/origins/${origin}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Christian Names of ${capital} Origin with Meanings`,
        description: `Discover ${names.length} Christian baby names of ${capital} origin with verified linguistic meanings.`,
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
            name: "Origins",
            item: `${SITE_URL}/origins`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: capital,
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
        <Link href="/origins" className="hover:text-oxblood hover:underline">
          Origins
        </Link>
        {" / "}
        <span className="text-oxblood font-medium">{capital}</span>
      </nav>

      <header className="text-center">
        <span className="smcp text-base font-semibold tracking-widest text-gold">
          Linguistic Heritage
        </span>
        <h1 className="mt-1 text-4xl font-semibold text-oxblood sm:text-5xl">
          {capital} Christian Names
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-xl italic text-ink-soft">
          {names.length} Christian names rooted in {capital} etymology, each with its verified meaning and historical context.
        </p>
        <Ornament className="my-7" />
      </header>

      <NameDirectory names={names} />
    </main>
  );
}

