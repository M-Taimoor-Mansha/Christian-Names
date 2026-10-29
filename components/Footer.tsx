import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="mt-10 text-center text-sm text-ink-soft">
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="hover:text-oxblood hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-1">© 2026 Christian Names</p>
    </footer>
  );
}
