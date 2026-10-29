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

      <h2>Use of Content</h2>
      <p>
        The content on this site is provided for general information, education, and
        personal reference. You may not scrape, copy, republish, or distribute large portions of
        the dataset or website content without explicit written permission.
      </p>

      <h2>Scholarly Accuracy &amp; Etymology</h2>
      <p>
        We strive to ensure that all name meanings, biblical citations, and linguistic origins are accurate and grounded in reputable academic references. However, onomastic interpretations and transliterations vary across historical traditions. The information is provided &ldquo;as is&rdquo; without warranties of any kind.
      </p>

      <h2>Advertising and External Links</h2>
      <p>
        Christian Names may display non-intrusive advertisements or provide links to third-party resources and voluntary support services. We do not endorse or assume liability for the content, privacy practices, or availability of external websites.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Under no circumstances shall the operators or contributors of Christian Names be liable for any direct, indirect, incidental, or consequential damages resulting from your use of the site or reliance on its content.
      </p>

      <h2>Modifications</h2>
      <p>
        We reserve the right to modify these terms at any time. Continued use of the website following any updates constitutes acceptance of the revised terms.
      </p>
    </LegalPage>
  );
}
