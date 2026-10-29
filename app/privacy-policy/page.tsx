import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Christian Names handles data, cookies and advertising, including Google AdSense.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 29, 2026">
      <p>
        Christian Names respects your privacy. This policy explains what
        information is collected when you visit this website and how it is used.
      </p>

      <h2>Information we collect</h2>
      <p>
        We do not require accounts or signups, and we do not ask you for
        personal information to browse the site. Our servers and hosting
        provider may automatically record standard technical data such as IP
        address, browser type, and pages visited.
      </p>

      <h2>Cookies and advertising</h2>
      <p>
        We use Google AdSense to show ads. Google and its partners use cookies
        to serve ads based on your visits to this and other websites. Google’s
        use of advertising cookies enables it and its partners to serve ads to
        you based on your visit to this site and/or other sites on the internet.
      </p>
      <p>
        You can opt out of personalized advertising by visiting{" "}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ads Settings
        </a>{" "}
        or{" "}
        <a
          href="https://www.aboutads.info"
          target="_blank"
          rel="noopener noreferrer"
        >
          aboutads.info
        </a>
        . You can also control cookies in your browser settings.
      </p>

      <h2>Donations</h2>
      <p>
        If you choose to donate, your payment is handled by a third-party
        payment provider. We do not see or store your card details.
      </p>

      <h2>Third-party links</h2>
      <p>
        Our site may link to other websites. We are not responsible for the
        privacy practices of those sites.
      </p>

      <h2>Children</h2>
      <p>
        This site is intended for adults looking for baby names. We do not
        knowingly collect personal information from children.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The latest version will
        always be on this page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Please visit our{" "}
        <a href="/contact">Contact</a> page.
      </p>
    </LegalPage>
  );
}
