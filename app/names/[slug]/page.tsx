import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import ShareButton from "@/components/ShareButton";
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
    title: `${item.name}: Christian Name Meaning, Origin & Bible Reference`,
    description: `${item.name} is a Christian ${kind} name of ${item.origin} origin meaning "${item.meaning}". Discover its etymology, biblical passages, and pronunciation.`,
    alternates: { canonical: `/names/${item.slug}` },
    openGraph: {
      title: `${item.name}: Meaning, Origin & Bible Reference`,
      description: `${item.name} means "${item.meaning}". A Christian ${kind} name of ${item.origin} origin.`,
      url: `${SITE_URL}/names/${item.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${item.name} - Christian Name Meaning`,
      description: `${item.name} (${item.origin}): "${item.meaning}"`,
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

  const firstLetter = item.name.charAt(0).toUpperCase();
  const letterHref = `/names/letter/${firstLetter.toLowerCase()}`;

  const related = getRelatedNames(item, 6);

  const sorted = [...getNamesByGender(item.gender)].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const index = sorted.findIndex((n) => n.slug === item.slug);
  const prev = index > 0 ? sorted[index - 1] : undefined;
  const next = index < sorted.length - 1 ? sorted[index + 1] : undefined;

  const pageUrl = `${SITE_URL}/names/${item.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${item.name}: Christian Name Meaning, Origin & Bible Reference`,
        description: `${item.name} is a Christian ${kind} name of ${item.origin} origin meaning "${item.meaning}".`,
        inLanguage: "en",
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
        mainEntity: {
          "@type": "DefinedTerm",
          name: item.name,
          description: item.meaning,
          inDefinedTermSet: {
            "@type": "DefinedTermSet",
            name: "Christian Names Dictionary",
            url: SITE_URL,
          },
        },
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "Christian Names",
          url: SITE_URL,
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
            name: sectionLabel,
            item: `${SITE_URL}${sectionHref}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `Letter ${firstLetter}`,
            item: `${SITE_URL}${letterHref}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: item.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  const labelClass = "smcp text-xl font-semibold text-oxblood";

  return (
    <main className="mx-auto max-w-2xl py-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Multi-tier breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-x-2 text-base italic text-ink-soft"
      >
        <Link href="/" className="hover:text-oxblood hover:underline">
          Home
        </Link>
        <span aria-hidden>/</span>
        <Link href={sectionHref} className="hover:text-oxblood hover:underline">
          {sectionLabel}
        </Link>
        <span aria-hidden>/</span>
        <Link href={letterHref} className="hover:text-oxblood hover:underline">
          Letter {firstLetter}
        </Link>
        <span aria-hidden>/</span>
        <span className="font-medium text-oxblood">{item.name}</span>
      </nav>

      <article>
        {/* Headword Header */}
        <header className="border-b-2 border-gold pb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="text-6xl font-semibold leading-none text-oxblood sm:text-7xl">
              {item.name}
            </h1>
            <span className="rounded-full border border-gold/60 bg-gold/10 px-3 py-0.5 text-sm font-semibold text-ink-soft">
              {item.biblical ? "Biblical Name" : "Christian Heritage"}
            </span>
          </div>

          {item.pronunciation && (
            <p className="mt-3 text-xl text-ink-soft">
              Pronunciation: <span className="font-mono text-ink">/{item.pronunciation}/</span>
            </p>
          )}

          <p className="mt-2 text-xl italic text-ink-soft">
            proper noun, Christian {kind === "boy" ? "boy’s" : "girl’s"} name
          </p>

          {/* Social share & copy controls */}
          <ShareButton name={item.name} meaning={item.meaning} url={pageUrl} />
        </header>

        {/* Primary Definition & Etymology Callout */}
        <section aria-labelledby="definition-heading" className="mt-8 rounded-lg border border-ink/15 bg-paper-deep/40 p-6">
          <h2 id="definition-heading" className={labelClass}>
            Primary Meaning &amp; Linguistic Heritage
          </h2>
          <p className="mt-3 text-2xl font-serif leading-snug text-ink">
            &ldquo;{item.meaning}&rdquo;
          </p>

          <dl className="mt-6 grid grid-cols-[7rem_1fr] gap-y-2 text-lg">
            <dt className="smcp text-ink-soft">Linguistic Origin</dt>
            <dd className="font-medium italic">
              <Link
                href={`/origins/${item.origin.toLowerCase()}`}
                className="text-oxblood hover:underline"
              >
                {item.origin}
              </Link>
            </dd>

            <dt className="smcp text-ink-soft">Classification</dt>
            <dd>{item.biblical ? "Direct Biblical Name" : "Traditional Christian Name"}</dd>

            {item.variants && item.variants.length > 0 && (
              <>
                <dt className="smcp text-ink-soft">Variants</dt>
                <dd>{item.variants.join(", ")}</dd>
              </>
            )}
          </dl>
        </section>

        {/* Ad Placement Top - Only renders when configured with valid publisher and slot IDs */}
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_DETAIL_TOP} />

        {/* Scripture Citation & Context */}
        {item.reference && (
          <section aria-labelledby="scripture-heading" className="mt-8">
            <h2 id="scripture-heading" className={labelClass}>
              {item.biblical ? "Scripture Reference & Significance" : "Historical Christian Context"}
            </h2>
            <div className="mt-3 border-l-4 border-oxblood bg-paper-deep/30 py-3 pl-4 pr-3">
              <p className="text-xl italic text-ink leading-relaxed">
                {item.reference}
              </p>
            </div>
          </section>
        )}

        {/* AEO / GEO Direct Answer Section */}
        <section aria-labelledby="about-heading" className="mt-8 space-y-4 text-lg leading-relaxed text-ink">
          <h2 id="about-heading" className={labelClass}>
            Detailed Overview of the Name {item.name}
          </h2>

          <div className="space-y-3">
            <p>
              <strong>What does the name {item.name} mean?</strong> In Christian onomastics,{" "}
              {item.name} carries the primary definition of &ldquo;{item.meaning}&rdquo;. It is associated with the linguistic traditions of {item.origin}.
            </p>

            {item.biblical ? (
              <p>
                <strong>Is {item.name} in the Bible?</strong> Yes. {item.name} is recorded in the Scriptures. The biblical record notes: {item.reference}
              </p>
            ) : (
              <p>
                <strong>Is {item.name} a biblical name?</strong> While {item.name} does not appear directly as a personal name in the biblical canon, it has a rich history within Christian communities, honoring faithful believers, saints, or theological virtues.
              </p>
            )}

            {item.variants && item.variants.length > 0 && (
              <p>
                <strong>What are common variations of {item.name}?</strong> Common historical and international variants include {item.variants.join(", ")}.
              </p>
            )}
          </div>
        </section>

        {/* Ad Placement Bottom */}
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_DETAIL_BOTTOM} />
      </article>

      {/* Cross-references & Related Names */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-12 border-t border-gold/40 pt-6">
          <h2 id="related-heading" className={labelClass}>
            Related &amp; Similar Names
          </h2>
          <ul className="dict-columns mt-4">
            {related.map((r) => (
              <li key={r.slug} className="break-inside-avoid py-1.5">
                <Link
                  href={`/names/${r.slug}`}
                  className="font-semibold text-oxblood hover:underline"
                >
                  {r.name}
                </Link>{" "}
                <span className="text-base italic text-ink-soft">
                  — {r.meaning}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Alphabetical Previous / Next Navigation */}
      <nav
        aria-label="Neighbouring entries"
        className="mt-12 flex justify-between gap-4 border-t border-gold pt-6 text-xl"
      >
        {prev ? (
          <Link
            href={`/names/${prev.slug}`}
            className="group flex flex-col text-left hover:text-oxblood"
          >
            <span className="text-sm italic text-ink-soft group-hover:text-oxblood">
              &larr; Previous entry
            </span>
            <span className="font-semibold">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/names/${next.slug}`}
            className="group flex flex-col text-right hover:text-oxblood"
          >
            <span className="text-sm italic text-ink-soft group-hover:text-oxblood">
              Next entry &rarr;
            </span>
            <span className="font-semibold">{next.name}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
