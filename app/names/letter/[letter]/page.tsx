import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import NameDirectory from "@/components/NameDirectory";
import Ornament from "@/components/Ornament";
import { allNames, filterByLetter, ALPHABET, SITE_URL } from "@/lib/utils";

type Props = { params: Promise<{ letter: string }> };

export function generateStaticParams() {
  return ALPHABET.map((l) => ({ letter: l.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { letter } = await params;
  const upper = letter.toUpperCase();
  return {
    title: `Christian Names Starting with ${upper} - Meanings & Origins`,
    description: `Browse Christian boy and girl names starting with the letter ${upper}, complete with biblical references, etymologies, and pronunciations.`,
    alternates: { canonical: `/names/letter/${letter.toLowerCase()}` },
    openGraph: {
      title: `Christian Names Starting with ${upper}`,
      description: `Explore Christian baby names beginning with the letter ${upper}.`,
      url: `${SITE_URL}/names/letter/${letter.toLowerCase()}`,
    },
  };
}

export default async function LetterPage({ params }: Props) {
  const { letter } = await params;
  const upper = letter.toUpperCase();

  if (!ALPHABET.includes(upper)) {
    notFound();
  }

  const matching = filterByLetter(allNames, upper)
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
        <span>Alphabet</span>
        {" / "}
        <span className="text-oxblood font-medium">Letter {upper}</span>
      </nav>

      <header className="text-center">
        <span className="smcp text-base font-semibold tracking-widest text-gold">
          Alphabetical Lexicon
        </span>
        <h1 className="mt-1 text-4xl font-semibold text-oxblood sm:text-5xl">
          Christian Names: Letter {upper}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-xl italic text-ink-soft">
          {matching.length} names beginning with the letter {upper}.
        </p>
        <Ornament className="my-7" />
      </header>

      {/* Alphabet Switcher Bar */}
      <div className="mb-8 flex flex-wrap justify-center gap-1">
        {ALPHABET.map((l) => {
          const active = l === upper;
          return (
            <Link
              key={l}
              href={`/names/letter/${l.toLowerCase()}`}
              className={`flex h-9 w-9 items-center justify-center border text-base font-semibold transition-colors ${
                active
                  ? "border-oxblood bg-oxblood text-paper"
                  : "border-ink/20 bg-paper text-oxblood hover:border-oxblood hover:bg-paper-deep"
              }`}
            >
              {l}
            </Link>
          );
        })}
      </div>

      <NameDirectory names={matching} />
    </main>
  );
}

