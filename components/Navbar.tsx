"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen } from "lucide-react";
import DonationModal from "@/components/DonationModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/christian-boy-names", label: "Boys’ Names" },
  { href: "/christian-girl-names", label: "Girls’ Names" },
  { href: "/biblical-names", label: "Biblical Names" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b-2 border-gold bg-cloth text-paper shadow-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-[62rem] items-center justify-between gap-x-6 px-4 py-3"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-wide text-gold hover:text-gold/90"
        >
          <BookOpen className="h-5 w-5" aria-hidden />
          <span>Christian Names</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-x-5">
          <ul className="flex items-center gap-x-5">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`border-b-2 pb-0.5 text-base transition-colors ${
                      active
                        ? "border-gold text-paper font-medium"
                        : "border-transparent text-paper/75 hover:text-paper"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="ml-2 pl-4 border-l border-gold/30">
            <DonationModal />
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <DonationModal />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="rounded p-1.5 text-paper hover:bg-cloth/80 focus-visible:outline-2 focus-visible:outline-gold"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden />
            ) : (
              <Menu className="h-6 w-6" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-gold/30 bg-cloth/95 px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-y-2">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-1.5 text-lg transition-colors ${
                      active
                        ? "font-medium text-gold"
                        : "text-paper/85 hover:text-paper"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
