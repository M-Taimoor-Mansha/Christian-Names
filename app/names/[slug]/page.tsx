import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import {
  SITE_URL,
  allNames,
  getNameBySlug,
  getNamesByGender,
  getRelatedNames,
} from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allNames.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getNameBySlug(slug);
  if (!item) return {};

  const kind = item.gender === "boy" ? "boy" : "girl";
  return {
    title: `${item.name}: Meaning, Origin & Bible Reference`,
    description: `${item.name} is a Christian ${kind} name of ${item.origin} origin meaning "${item.meaning}". Discover its origin, pronunciation and biblical significance.`,
    alternates: { canonical: `/names/${item.slug}` },
    openGraph: {
      title: `${item.name}: Meaning & Origin`,
      description: `${item.name} means "${item.meaning}". A Christian ${kind} name of ${item.origin} origin.`,
      url: `${SITE_URL}/names/${item.slug}`,
      type: "article",
    },
  };
}

export default async function NamePage({ params }: Props) {
  const { slug } = await params;
  const item = getNameBySlug(slug);
  if (!item) notFound();

  const kind = item.gender === "boy" ? "boy" : "girl";
  const sectionHref =
    item.gender === "boy" ? "/christian-boy-names" : "/christian-girl-names";
  const sectionLabel =
    item.gender === "boy" ? "Christian Boy Names" : "Christian Girl Names";

  const related = getRelatedNames(item, 6);

  const sorted = [...getNamesByGender(item.gender)].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const index = sorted.findIndex((n) => n.slug === item.slug);
  const prev = index > 0 ? sorted[index - 1] : undefined;
  const next = index < sorted.length - 1 ? sorted[index + 1] : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${item.name}: Meaning, Origin & Bible Reference`,
        description: `${item.name} is a Christian ${kind} name of ${item.origin} origin meaning "${item.meaning}".`,
        mainEntityOfPage: `${SITE_URL}/names/${item.slug}`,
        about: item.name,
        inLanguage: "en",
        publisher: { "@type": "Organization", name: "Christian Names" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: sectionLabel,
            item: `${SITE_URL}${sectionHref}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.name,
            item: `${SITE_URL}/names/${item.slug}`,
          },
        ],
      },
    ],
  };

  const labelClass = "smcp text-xl text-ink-soft";

  return (
    <main className="mx-auto max-w-2xl py-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-8 text-base italic text-ink-soft"
      >
        <Link href="/" className="hover:text-oxblood hover:underline">
          Home
        </Link>
        {" / "}
        <Link href={sectionHref} className="hover:text-oxblood hover:underline">
          {sectionLabel}
        </Link>
        {" / "}
        <span>{item.name}</span>
      </nav>

      <article>
        {/* Headword */}
        <header className="border-b-2 border-gold pb-4">
          <h1 className="text-6xl font-semibold leading-none text-oxblood sm:text-7xl">
            {item.name}
          </h1>
          {item.pronunciation && (
            <p className="mt-3 text-xl">/{item.pronunciation}/</p>
          )}
          <p className="mt-2 text-xl italic text-ink-soft">
            proper noun, {kind === "boy" ? "boy’s" : "girl’s"} name
          </p>
        </header>

        {/* Definition */}
        <section className="mt-6">
          <p className="text-2xl leading-snug">{item.meaning}</p>

          <dl className="mt-6 grid grid-cols-[6.5rem_1fr] gap-y-2 text-lg">
            <dt className={labelClass}>Origin</dt>
            <dd className="italic">{item.origin}</dd>
            {item.variants && item.variants.length > 0 && (
              <>
                <dt className={labelClass}>Variants</dt>
                <dd>{item.variants.join(", ")}</dd>
              </>
            )}
          </dl>
        </section>

        <AdSlot slot="0000000001" />

        {/* Reference */}
        {item.reference && (
          <section className="mt-8">
            <h2 className={labelClass}>
              {item.biblical ? "Bible reference" : "Background"}
            </h2>
            <p className="mt-2 border-l-4 border-oxblood pl-4 text-xl italic">
              {item.reference}
            </p>
          </section>
        )}

        {/* About */}
        <section className="mt-8">
          <h2 className={labelClass}>About the name {item.name}</h2>
          <p className="mt-2">
            {item.name} is a {kind}&rsquo;s name of {item.origin} origin that
            means &ldquo;{item.meaning}&rdquo;.
            {item.biblical
              ? " It appears in the Bible, which makes it a meaningful choice for Christian families."
              : " It is widely used among Christian families around the world."}
          </p>
        </section>

        <AdSlot slot="0000000002" />
      </article>

      {/* Cross-references */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className={labelClass}>See also</h2>
          <ul className="dict-columns mt-2">
            {related.map((r) => (
              <li key={r.slug} className="break-inside-avoid py-1">
                <Link
                  href={`/names/${r.slug}`}
                  className="font-semibold text-oxblood hover:underline"
                >
                  {r.name}
                </Link>{" "}
                <span className="text-base italic text-ink-soft">
                  {r.meaning}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Turn the page */}
      <nav
        aria-label="Neighbouring entries"
        className="mt-12 flex justify-between gap-4 border-t border-gold pt-4 text-xl"
      >
        {prev ? (
          <Link href={`/names/${prev.slug}`} className="hover:text-oxblood">
            <span className="block text-sm italic text-ink-soft">
              Previous entry
            </span>
            {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/names/${next.slug}`}
            className="text-right hover:text-oxblood"
          >
            <span className="block text-sm italic text-ink-soft">
              Next entry
            </span>
            {next.name}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
