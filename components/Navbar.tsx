"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DonationModal from "@/components/DonationModal";

const links = [
  { href: "/", label: "Home" },
  { href: "/christian-boy-names", label: "Boys’ Names" },
  { href: "/christian-girl-names", label: "Girls’ Names" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b-2 border-gold bg-cloth text-paper">
      <nav className="mx-auto flex max-w-[62rem] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link
          href="/"
          className="text-xl font-semibold tracking-wide text-gold"
        >
          Christian Names
        </Link>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b-2 pb-0.5 text-base ${
                    active
                      ? "border-gold text-paper"
                      : "border-transparent text-paper/75 hover:text-paper"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <DonationModal />
          </li>
        </ul>
      </nav>
    </header>
  );
}
