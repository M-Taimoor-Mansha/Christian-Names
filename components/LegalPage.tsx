import Link from "next/link";
import Ornament from "@/components/Ornament";
import { SITE_URL } from "@/lib/utils";

export default function LegalPage({
  title,
  updated,
  path,
  children,
}: {
  title: string;
  updated?: string;
  path?: string;
  children: React.ReactNode;
}) {
  const pageUrl = path ? `${SITE_URL}${path}` : undefined;
  const jsonLd = pageUrl
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name: title,
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
                name: title,
                item: pageUrl,
              },
            ],
          },
        ],
      }
    : null;

  return (
    <main className="mx-auto max-w-2xl py-4">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      {path && (
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-base italic text-ink-soft"
        >
          <Link href="/" className="hover:text-oxblood hover:underline">
            Home
          </Link>
          {" / "}
          <span className="text-oxblood font-medium">{title}</span>
        </nav>
      )}

      <header className="text-center">
        <h1 className="text-4xl font-semibold text-oxblood sm:text-5xl">
          {title}
        </h1>
        {updated && (
          <p className="mt-2 text-lg italic text-ink-soft">
            Last updated: {updated}
          </p>
        )}
        <Ornament className="my-7" />
      </header>
      <div className="prose-book">{children}</div>
    </main>
  );
}
