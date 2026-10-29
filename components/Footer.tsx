import Link from "next/link";
import Ornament from "@/components/Ornament";

const directoryLinks = [
  { href: "/christian-boy-names", label: "Boys’ Names" },
  { href: "/christian-girl-names", label: "Girls’ Names" },
  { href: "/biblical-names", label: "Biblical Names" },
  { href: "/donate", label: "Voluntary Donations" },
];

const editorialLinks = [
  { href: "/about", label: "About Us" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/sources", label: "Sources & Methodology" },
  { href: "/contact", label: "Contact & Corrections" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="mt-14 pt-6 border-t border-gold/40 text-center text-sm text-ink-soft">
      <Ornament className="mb-6 opacity-75" />

      <div className="mx-auto max-w-4xl space-y-4">
        {/* Navigation directory links */}
        <nav aria-label="Footer directory navigation">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 font-medium text-oxblood">
            {directoryLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal and trust links */}
        <nav aria-label="Editorial and legal links">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-ink-soft/90">
            {editorialLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-oxblood hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="pt-2 text-xs text-ink-soft/80">
          Christian Names is an independent, non-denominational educational reference dedicated to the historical etymology, linguistic origins, and biblical significance of names.
        </p>

        <p className="text-xs">
          &copy; 2026 Christian Names. All rights reserved. Content provided for personal reference.
        </p>
      </div>
    </footer>
  );
}
