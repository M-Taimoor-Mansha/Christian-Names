import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Christian Names website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="October 29, 2026">
      <p>
        By using Christian Names, you agree to these terms. If you do not agree,
        please do not use the site.
      </p>

      <h2>Use of content</h2>
      <p>
        The content on this site is provided for general information and
        personal use. You may not copy, republish or scrape large portions of
        the site without our written permission.
      </p>

      <h2>Accuracy</h2>
      <p>
        We work to keep name meanings and origins accurate, but they can differ
        between sources and languages. The information is provided “as is”
        without any guarantee.
      </p>

      <h2>Advertising and links</h2>
      <p>
        The site shows third-party ads and may link to external websites. We are
        not responsible for their content.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        We are not liable for any loss or damage arising from your use of this
        site.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms at any time. Continued use of the site means
        you accept the updated terms.
      </p>
    </LegalPage>
  );
}
