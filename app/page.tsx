import type { Metadata } from "next";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import Ornament from "@/components/Ornament";
import {
  SITE_URL,
  boyNames,
  girlNames,
  getBiblicalNames,
  ALPHABET,
} from "@/lib/utils";
import { BookOpen, Sparkles, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Christian Names: Baby Name Meanings, Origins & Bible References",
  description:
    "Explore a comprehensive dictionary of Christian, biblical, Hebrew, Greek, and Latin baby names with authentic meanings, scripture references, and historical origins.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Christian Names: Baby Name Meanings, Origins & Bible References",
    description:
      "A free, trustworthy dictionary of Christian baby names with scripture references, linguistic origins, and pronunciations.",
    url: SITE_URL,
    type: "website",
  },
};

export default function HomePage() {
  const biblicalCount = getBiblicalNames().length;
  const totalCount = boyNames.length + girlNames.length;

  // Selected featured names for curated editorial spotlights
  const featuredBoys = boyNames
    .filter((n) => ["aaron", "caleb", "elijah", "gabriel", "nathaniel", "solomon"].includes(n.slug))
    .slice(0, 4);

  const featuredGirls = girlNames
    .filter((n) => ["abigail", "elizabeth", "hannah", "lydia", "phoebe", "tabitha"].includes(n.slug))
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Christian Names",
        description:
          "Free dictionary of Christian and biblical baby names with authentic meanings, origins, and Scripture references.",
        publisher: {
          "@type": "Organization",
          name: "Christian Names",
          url: SITE_URL,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/names/{search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <main className="py-2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero Section */}
      <section className="text-center">
        <span className="smcp inline-block text-base font-semibold tracking-widest text-gold">
          Lexicon &amp; Reference
        </span>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-oxblood sm:text-6xl">
          Christian Names Dictionary
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed text-ink-soft">
          A timeless, scholarly reference of {totalCount > 300 ? `${totalCount.toLocaleString()}+` : "over 3,000"} Christian, biblical, Hebrew, Greek, and Latin names. Discover verified meanings, etymological origins, and sacred scripture citations for your child.
        </p>

        {/* Prominent Search Bar */}
        <div className="mt-8">
          <SearchBar />
        </div>

        {/* Quick Discovery Category Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-base">
          <span className="text-sm font-medium text-ink-soft">Explore:</span>
          <Link
            href="/christian-boy-names"
            className="rounded-full border border-ink/20 bg-paper px-3.5 py-1 text-ink hover:border-oxblood hover:bg-paper-deep"
          >
            Boy Names ({boyNames.length})
          </Link>
          <Link
            href="/christian-girl-names"
            className="rounded-full border border-ink/20 bg-paper px-3.5 py-1 text-ink hover:border-oxblood hover:bg-paper-deep"
          >
            Girl Names ({girlNames.length})
          </Link>
          <Link
            href="/biblical-names"
            className="rounded-full border border-gold/60 bg-gold/10 px-3.5 py-1 font-medium text-ink hover:bg-gold/20"
          >
            Biblical Names ({biblicalCount})
          </Link>
          <Link
            href="/origins/hebrew"
            className="rounded-full border border-ink/20 bg-paper px-3.5 py-1 text-ink-soft hover:border-oxblood hover:bg-paper-deep"
          >
            Hebrew
          </Link>
          <Link
            href="/origins/greek"
            className="rounded-full border border-ink/20 bg-paper px-3.5 py-1 text-ink-soft hover:border-oxblood hover:bg-paper-deep"
          >
            Greek
          </Link>
          <Link
            href="/origins/latin"
            className="rounded-full border border-ink/20 bg-paper px-3.5 py-1 text-ink-soft hover:border-oxblood hover:bg-paper-deep"
          >
            Latin
          </Link>
        </div>

        <Ornament className="my-10" />
      </section>

      {/* Alphabetical Browsing Bar */}
      <section aria-labelledby="browse-alphabet-heading" className="my-8 text-center">
        <h2 id="browse-alphabet-heading" className="smcp text-lg text-ink-soft">
          Browse Alphabetically
        </h2>
        <div className="mt-3 flex flex-wrap justify-center gap-1">
          {ALPHABET.map((letter) => (
            <Link
              key={letter}
              href={`/names/letter/${letter.toLowerCase()}`}
              className="flex h-9 w-9 items-center justify-center border border-ink/20 bg-paper text-base font-semibold text-oxblood transition-colors hover:border-oxblood hover:bg-paper-deep focus-visible:outline-2 focus-visible:outline-oxblood"
            >
              {letter}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Names Section */}
      <section className="my-14">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-oxblood">
            Editorially Featured Names
          </h2>
          <p className="mt-1 text-lg italic text-ink-soft">
            Enduring Christian names distinguished by theological depth and heritage.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Featured Boys */}
          <div className="rounded-lg border border-gold/40 bg-paper p-6 shadow-xs">
            <h3 className="smcp flex items-center gap-2 border-b border-gold/40 pb-2 text-xl font-semibold text-oxblood">
              <Compass className="h-5 w-5 text-gold" aria-hidden />
              <span>Sons of Faith</span>
            </h3>
            <ul className="mt-4 divide-y divide-ink/10">
              {featuredBoys.map((n) => (
                <li key={n.slug} className="py-2.5">
                  <Link
                    href={`/names/${n.slug}`}
                    className="group flex items-baseline justify-between"
                  >
                    <div>
                      <span className="text-xl font-semibold text-oxblood group-hover:underline">
                        {n.name}
                      </span>
                      <span className="ml-2 text-sm italic text-ink-soft">
                        ({n.origin})
                      </span>
                    </div>
                    <span className="text-right text-base text-ink-soft">
                      {n.meaning}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-2 text-right">
              <Link
                href="/christian-boy-names"
                className="text-sm font-semibold text-oxblood hover:underline"
              >
                View all boy names &rarr;
              </Link>
            </div>
          </div>

          {/* Featured Girls */}
          <div className="rounded-lg border border-gold/40 bg-paper p-6 shadow-xs">
            <h3 className="smcp flex items-center gap-2 border-b border-gold/40 pb-2 text-xl font-semibold text-oxblood">
              <Sparkles className="h-5 w-5 text-gold" aria-hidden />
              <span>Daughters of Grace</span>
            </h3>
            <ul className="mt-4 divide-y divide-ink/10">
              {featuredGirls.map((n) => (
                <li key={n.slug} className="py-2.5">
                  <Link
                    href={`/names/${n.slug}`}
                    className="group flex items-baseline justify-between"
                  >
                    <div>
                      <span className="text-xl font-semibold text-oxblood group-hover:underline">
                        {n.name}
                      </span>
                      <span className="ml-2 text-sm italic text-ink-soft">
                        ({n.origin})
                      </span>
                    </div>
                    <span className="text-right text-base text-ink-soft">
                      {n.meaning}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-2 text-right">
              <Link
                href="/christian-girl-names"
                className="text-sm font-semibold text-oxblood hover:underline"
              >
                View all girl names &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Collections Grid */}
      <section className="my-14 border-t border-gold/40 pt-10">
        <h2 className="text-center text-3xl font-semibold text-oxblood">
          Curated Thematic Collections
        </h2>
        <p className="mt-1 text-center text-lg italic text-ink-soft">
          Explore names grouped by biblical roots, linguistic heritage, and spiritual virtues.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/biblical-names"
            className="rounded border border-ink/15 bg-paper p-5 transition-all hover:border-oxblood hover:bg-paper-deep hover:shadow-xs"
          >
            <h3 className="text-xl font-semibold text-oxblood">Biblical Names</h3>
            <p className="mt-2 text-base text-ink-soft">
              Names appearing in the Old and New Testaments with chapter-and-verse scripture citations.
            </p>
          </Link>

          <Link
            href="/origins/hebrew"
            className="rounded border border-ink/15 bg-paper p-5 transition-all hover:border-oxblood hover:bg-paper-deep hover:shadow-xs"
          >
            <h3 className="text-xl font-semibold text-oxblood">Hebrew Origin Names</h3>
            <p className="mt-2 text-base text-ink-soft">
              Names derived from ancient Biblical Hebrew roots, invoking divine attributes and covenants.
            </p>
          </Link>

          <Link
            href="/origins/greek"
            className="rounded border border-ink/15 bg-paper p-5 transition-all hover:border-oxblood hover:bg-paper-deep hover:shadow-xs"
          >
            <h3 className="text-xl font-semibold text-oxblood">Greek Origin Names</h3>
            <p className="mt-2 text-base text-ink-soft">
              Names from the Koine Greek New Testament, early church apostles, and Christian theologians.
            </p>
          </Link>

          <Link
            href="/origins/latin"
            className="rounded border border-ink/15 bg-paper p-5 transition-all hover:border-oxblood hover:bg-paper-deep hover:shadow-xs"
          >
            <h3 className="text-xl font-semibold text-oxblood">Latin &amp; Saint Names</h3>
            <p className="mt-2 text-base text-ink-soft">
              Names rooted in early Roman Christian history, church fathers, martyrs, and saints.
            </p>
          </Link>

          <Link
            href="/christian-boy-names"
            className="rounded border border-ink/15 bg-paper p-5 transition-all hover:border-oxblood hover:bg-paper-deep hover:shadow-xs"
          >
            <h3 className="text-xl font-semibold text-oxblood">All Christian Boys</h3>
            <p className="mt-2 text-base text-ink-soft">
              Full directory of boys’ names arranged A through Z with phonetic keys and origins.
            </p>
          </Link>

          <Link
            href="/christian-girl-names"
            className="rounded border border-ink/15 bg-paper p-5 transition-all hover:border-oxblood hover:bg-paper-deep hover:shadow-xs"
          >
            <h3 className="text-xl font-semibold text-oxblood">All Christian Girls</h3>
            <p className="mt-2 text-base text-ink-soft">
              Full directory of girls’ names arranged A through Z with verified meanings.
            </p>
          </Link>
        </div>
      </section>

      {/* Editorial Scope & Methodology */}
      <section className="my-14 rounded-xl border border-gold/50 bg-paper-deep/60 p-8">
        <div className="mx-auto max-w-3xl text-center">
          <BookOpen className="mx-auto h-8 w-8 text-gold" aria-hidden />
          <h2 className="mt-3 text-3xl font-semibold text-oxblood">
            Our Editorial Approach &amp; Scope
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">
            Unlike commercial baby name databases that rely on automated scraping or invented meanings, Christian Names is committed to linguistic accuracy and factual biblical reporting.
          </p>
          <div className="mt-6 grid gap-4 text-left sm:grid-cols-2">
            <div className="rounded bg-paper p-4 border border-ink/10">
              <h3 className="font-semibold text-oxblood">Scripture Verification</h3>
              <p className="mt-1 text-sm text-ink-soft">
                Names marked biblical provide exact chapter-and-verse citations. We clearly distinguish between biblical characters and later historical saints.
              </p>
            </div>
            <div className="rounded bg-paper p-4 border border-ink/10">
              <h3 className="font-semibold text-oxblood">Transparent Etymology</h3>
              <p className="mt-1 text-sm text-ink-soft">
                When a name&apos;s etymology is debated by scholars, we document the uncertainty honestly rather than fabricating a comforting definition.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-ink-soft">
            Learn more about our reference methodology in our{" "}
            <Link href="/editorial-policy" className="font-semibold text-oxblood underline">
              Editorial Policy
            </Link>{" "}
            and{" "}
            <Link href="/sources" className="font-semibold text-oxblood underline">
              Sources Reference
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="my-14 border-t border-gold/40 pt-10">
        <h2 className="text-center text-3xl font-semibold text-oxblood">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto mt-8 max-w-3xl space-y-4">
          <details className="group rounded border border-ink/15 bg-paper p-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-semibold text-oxblood text-lg">
              <span>What defines a Christian baby name?</span>
              <span className="transition-transform group-open:rotate-180 text-gold">&darr;</span>
            </summary>
            <p className="mt-3 text-base text-ink-soft leading-relaxed">
              Christian baby names encompass names of individuals in the Old and New Testaments (such as David, Sarah, Peter, and Mary), names honoring early Christian martyrs and saints, virtue names originating in Christian traditions (such as Grace, Hope, and Faith), and historically significant names used across global Christian communities.
            </p>
          </details>

          <details className="group rounded border border-ink/15 bg-paper p-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-semibold text-oxblood text-lg">
              <span>Does every Christian name appear in the Bible?</span>
              <span className="transition-transform group-open:rotate-180 text-gold">&darr;</span>
            </summary>
            <p className="mt-3 text-base text-ink-soft leading-relaxed">
              No. While many beloved Christian names are directly biblical, thousands of deeply meaningful Christian names come from early church history, desert fathers and mothers, saints, and language traditions including Greek, Latin, Celtic, and Anglo-Saxon. Our dictionary explicitly flags whether a name is biblical or traditional.
            </p>
          </details>

          <details className="group rounded border border-ink/15 bg-paper p-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-semibold text-oxblood text-lg">
              <span>Is this dictionary free to use?</span>
              <span className="transition-transform group-open:rotate-180 text-gold">&darr;</span>
            </summary>
            <p className="mt-3 text-base text-ink-soft leading-relaxed">
              Yes. Christian Names is completely free for everyone worldwide. There are no subscriptions, paywalls, or required registrations. We believe parents and researchers should have unfettered access to trustworthy name knowledge.
            </p>
          </details>

          <details className="group rounded border border-ink/15 bg-paper p-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between font-semibold text-oxblood text-lg">
              <span>How can I suggest a correction or new name?</span>
              <span className="transition-transform group-open:rotate-180 text-gold">&darr;</span>
            </summary>
            <p className="mt-3 text-base text-ink-soft leading-relaxed">
              We welcome scholarly feedback, corrections, and name suggestions from parents and scholars. Visit our{" "}
              <Link href="/contact" className="font-semibold text-oxblood underline">
                Contact page
              </Link>{" "}
              to submit citations and historical notes.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
