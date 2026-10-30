import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "About Us - Christian Names Dictionary",
  description:
    "Learn about the mission, scholarly approach, and history of Christian Names, a free global reference for Christian baby names and biblical etymology.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalPage title="About Christian Names" path="/about">
      <p>
        Christian Names is an independent, globally accessible dictionary dedicated to the etymology, history, and spiritual heritage of Christian personal names. We provide parents, scholars, educators, and pastors with an authentic, verified reference of names rooted in Sacred Scripture, early church history, and linguistic traditions across the world.
      </p>

      <h2>Our Vision and Purpose</h2>
      <p>
        Naming a child is an act of hope, faith, and identity. In ancient Hebrew, Greek, and Latin traditions, a name was not merely a convenient label but a declaration of character, a prayer of thanksgiving, or an invocation of divine grace.
      </p>
      <p>
        Many modern commercial baby name websites have reduced this sacred tradition to machine-generated lists, arbitrary ranking tables, and invented definitions. Christian Names was established to restore scholarly rigor and reverence to Christian onomastics.
      </p>

      <h2>What Sets Our Dictionary Apart</h2>
      <ul>
        <li>
          <strong>100% Free &amp; Open to All:</strong> No subscriptions, paywalls, or accounts. We believe trustworthy reference knowledge should be freely accessible to every family, regardless of geography or income.
        </li>
        <li>
          <strong>Verified Scripture Citations:</strong> Every biblical name links directly to specific book and chapter references in the Old or New Testament.
        </li>
        <li>
          <strong>Transparent Linguistic Roots:</strong> We distinguish between Biblical Hebrew, Aramaic, Koine Greek, Ecclesiastical Latin, Celtic, Anglo-Saxon, and other linguistic heritages.
        </li>
        <li>
          <strong>Ad-Light, Mobile-Friendly Design:</strong> We prioritize readability and speed, ensuring parents can search and explore without intrusive pop-ups, video banners, or layout shifts.
        </li>
      </ul>

      <h2>Editorial Standards and Independence</h2>
      <p>
        Our editorial team consults primary lexicons, historical concordances, and patristic records. We maintain strict non-commercial independence: we do not accept sponsored placements or modify historical facts for commercial gain. For full details on our research guidelines, please review our{" "}
        <Link href="/editorial-policy" className="text-oxblood underline">
          Editorial Policy
        </Link>{" "}
        and{" "}
        <Link href="/sources" className="text-oxblood underline">
          Sources Reference
        </Link>
        .
      </p>

      <h2>Voluntary Community Support</h2>
      <p>
        Christian Names is sustained by our passion for biblical heritage and the generosity of our readers. If this dictionary has helped your family find a meaningful name, learn how you can support our ongoing hosting and research on our{" "}
        <Link href="/donate" className="text-oxblood underline">
          Voluntary Donations page
        </Link>
        .
      </p>
    </LegalPage>
  );
}
