import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Christian Names for questions, corrections or suggestions.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <LegalPage title="Contact Us">
      <p>
        Have a question, a correction, or a name suggestion? We would love to
        hear from you.
      </p>
      {email ? (
        <p>
          Email us at <a href={`mailto:${email}`}>{email}</a>.
        </p>
      ) : (
        <p>Our contact email will be available here soon.</p>
      )}
      <p>We usually reply within a few days.</p>
    </LegalPage>
  );
}
