import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Contact Us - Christian Names",
  description:
    "Get in touch with the editorial team at Christian Names to suggest a name, submit an etymological correction, or ask a question.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <LegalPage title="Contact & Submissions" path="/contact">
      <p>
        We welcome inquiries, scholarly feedback, name suggestions, and corrections from parents, pastors, and language scholars worldwide.
      </p>

      <h2>How to Reach Us</h2>
      {email ? (
        <div className="rounded-lg border border-gold/40 bg-paper-deep/40 p-4">
          <p className="font-medium text-ink">
            Direct Editorial Email:{" "}
            <a href={`mailto:${email}`} className="text-oxblood underline">
              {email}
            </a>
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            We review incoming correspondence regularly and typically respond within two to three business days.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-ink/15 bg-paper-deep/30 p-4 text-ink-soft">
          <p>
            Our direct contact email is configured via our project environment. For contributors collaborating via GitHub, please submit an issue or suggestion directly through the{" "}
            <a
              href="https://github.com/M-Taimoor-Mansha/Christian-Names"
              target="_blank"
              rel="noopener noreferrer"
              className="text-oxblood underline font-medium"
            >
              Christian Names GitHub repository
            </a>
            .
          </p>
        </div>
      )}

      <h2>Submitting an Etymological Correction</h2>
      <p>
        If you believe an entry in our dictionary contains an error in etymology, spelling, or biblical cross-referencing, please include:
      </p>
      <ul>
        <li>The specific headword and URL of the entry.</li>
        <li>The proposed correction or additional historical variant.</li>
        <li>The academic source, lexicon (such as BDB, Gesenius, or BDAG), or scripture citation supporting the change.</li>
      </ul>

      <h2>Suggesting a New Name</h2>
      <p>
        We are continually expanding our reference to include verified Christian names from all language traditions. When suggesting a new entry, please ensure it meets the criteria outlined in our{" "}
        <Link href="/editorial-policy" className="text-oxblood underline">
          Editorial Policy
        </Link>
        .
      </p>
    </LegalPage>
  );
}
