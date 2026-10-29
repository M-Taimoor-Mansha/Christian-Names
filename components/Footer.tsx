import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-gold pt-6 text-center text-base text-ink-soft">
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="hover:text-oxblood hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm">
        © 2026 Christian Names. All rights reserved.
      </p>
    </footer>
  );
}
