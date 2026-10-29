import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy - Christian Names",
  description:
    "How Christian Names handles visitor data, cookies, voluntary support transactions, and third-party advertising in compliance with privacy standards.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 29, 2026">
      <p>
        Christian Names (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the site&rdquo;) values your privacy. This policy explains what information may be collected when you access and browse this website, how it is used, and your rights regarding cookies and personal data.
      </p>

      <h2>No User Accounts or Mandatory Data Collection</h2>
      <p>
        Christian Names is an open reference dictionary. We do not require registration, login credentials, passwords, or personal profiles. You can browse, search, and view all name meanings without providing your name, email address, or phone number.
      </p>

      <h2>Server Log Information</h2>
      <p>
        Like most modern websites, our hosting servers may automatically collect standard diagnostic technical data when you load a page. This may include your IP address, browser type and version, referring URLs, operating system, and the date and time of your request. This technical data is used solely to maintain system stability, security, and performance.
      </p>

      <h2>Cookies and Advertising (Google AdSense)</h2>
      <p>
        We may display non-intrusive advertisements served through Google AdSense to help offset hosting costs.
      </p>
      <ul>
        <li>
          Google, as a third-party vendor, uses cookies to serve ads on Christian Names.
        </li>
        <li>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visits to this site and/or other sites on the Internet.
        </li>
        <li>
          You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-oxblood underline"
          >
            Google Ads Settings
          </a>
          . Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting{" "}
          <a
            href="https://www.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
            className="text-oxblood underline"
          >
            aboutads.info
          </a>
          .
        </li>
      </ul>

      <h2>Voluntary Donations and Third-Party Processors</h2>
      <p>
        If you choose to make a voluntary contribution via external platforms such as Buy Me a Coffee or card processors, your payment transaction is handled entirely by the respective third-party payment provider. Christian Names does not process, store, or have access to your credit card numbers, banking details, or financial credentials. Please review the privacy policies of any third-party payment provider you use.
      </p>

      <h2>External Links</h2>
      <p>
        Our dictionary entries and resource pages may include links to external scholarly databases, concordances, or organizational resources. We are not responsible for the privacy practices or content of third-party websites.
      </p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        Christian Names is an educational reference intended for adults, parents, and scholars. We do not knowingly collect personal identifiable information from children under the age of 13.
      </p>

      <h2>Updates to this Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory changes. The latest version will always be posted on this page with the updated revision date.
      </p>

      <h2>Contact Information</h2>
      <p>
        If you have questions or concerns about this privacy policy, please reach out through our{" "}
        <Link href="/contact" className="text-oxblood underline">
          Contact page
        </Link>
        .
      </p>
    </LegalPage>
  );
}
