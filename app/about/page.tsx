import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Christian Names, a free resource for Christian baby names with meanings, origins and Bible references.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalPage title="About Christian Names">
      <p>
        Christian Names is a free website that helps parents find a meaningful
        name for their baby. Every name comes with its meaning, its origin and,
        where it applies, its connection to the Bible.
      </p>
      <p>
        We focus on names used by Christian families around the world: biblical
        names, names of saints, virtue names and traditional names from many
        languages and cultures.
      </p>

      <h2>Our goal</h2>
      <p>
        We want choosing a name to be simple and inspiring. There is no signup
        and no account. Search, browse, and find the name that feels right for
        your family.
      </p>

      <h2>Accuracy</h2>
      <p>
        Name meanings can vary between sources and languages. We do our best to
        keep our information accurate, and we welcome corrections. Please use
        the Contact page to reach us.
      </p>
    </LegalPage>
  );
}