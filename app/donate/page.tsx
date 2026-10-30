import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { sanitizeUrl } from "@/lib/utils";
import { Heart, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Support Christian Names - Voluntary Donations",
  description:
    "Learn how voluntary donations help keep the Christian Names dictionary free, ad-light, and accessible to researchers and parents worldwide.",
  alternates: { canonical: "/donate" },
};

export default function DonatePage() {
  const rawDonateUrl = process.env.NEXT_PUBLIC_DONATE_URL;
  const donateUrl = sanitizeUrl(rawDonateUrl);

  return (
    <LegalPage title="Support Christian Names" path="/donate">
      <div className="rounded-xl border border-gold/40 bg-paper-deep/50 p-6 text-center">
        <Heart className="mx-auto h-10 w-10 text-oxblood" aria-hidden />
        <h2 className="mt-2 text-2xl font-semibold text-oxblood">
          A Completely Free, Open Reference Resource
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-lg text-ink-soft">
          Christian Names is built for parents, scholars, pastors, and curious readers around the world. Every feature, name meaning, and Bible reference is available freely without registration or subscription.
        </p>

        {donateUrl ? (
          <div className="mt-6">
            <a
              href={donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-cloth shadow-sm transition-transform hover:scale-[1.02] hover:bg-gold/90 focus-visible:outline-2 focus-visible:outline-cloth"
            >
              <span>Support via Buy Me a Coffee</span>
              <ExternalLink className="h-5 w-5" aria-hidden />
            </a>
            <p className="mt-2 text-xs text-ink-soft">
              Direct and secure voluntary support. No recurring commitment required.
            </p>
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-ink/20 bg-paper p-4 text-sm text-ink-soft">
            <p>
              Online contributions are currently paused while we upgrade our support infrastructure. You can best support us by sharing this dictionary with expecting parents and friends!
            </p>
          </div>
        )}
      </div>

      <h2>How Your Voluntary Support Helps</h2>
      <p>
        Maintaining a comprehensive, 3,000-name scholarly dictionary requires continuous care and infrastructure. Voluntary contributions directly fund:
      </p>
      <ul>
        <li>
          <strong>Independent Lexicography:</strong> Ongoing research and cross-referencing against primary Hebrew, Greek, and Latin texts.
        </li>
        <li>
          <strong>Fast Global Hosting:</strong> High-speed server and Content Delivery Network (CDN) bandwidth so pages load instantaneously on mobile devices across North America, Europe, Africa, Asia, and Latin America.
        </li>
        <li>
          <strong>Ad-Light Experience:</strong> Minimizing reliance on intrusive advertisements and preserving an uncluttered reading environment.
        </li>
      </ul>

      <h2>Our Commitments to You</h2>
      <ul>
        <li>
          <strong>Never Mandatory:</strong> Access to our complete dictionary will always remain 100% free. We will never put name meanings behind a paywall.
        </li>
        <li>
          <strong>No Accounts or Tracking:</strong> You do not need to create an account, log in, or give us personal data to search or browse names.
        </li>
        <li>
          <strong>Financial Transparency:</strong> Voluntary donations are personal non-tax-deductible gifts made directly to our maintenance team. We make no claims of registered non-profit or tax-exempt charitable status.
        </li>
      </ul>

      <p className="mt-8 text-center text-sm text-ink-soft">
        Have questions or want to partner with our research? Please visit our{" "}
        <Link href="/contact" className="font-semibold text-oxblood underline">
          Contact page
        </Link>
        .
      </p>
    </LegalPage>
  );
}
