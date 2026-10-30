import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "Our editorial standards for researching Christian names, linguistic origins, biblical citations, and handling disputed etymologies.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <LegalPage title="Editorial Policy" updated="October 29, 2026" path="/editorial-policy">
      <p>
        At Christian Names, our mission is to provide an authoritative, culturally respectful, and transparent dictionary of Christian, biblical, Hebrew, Greek, Latin, and related historical names.
      </p>

      <h2>Core Editorial Standards</h2>
      <p>
        Every entry in our dictionary undergoes rigorous verification according to five fundamental principles:
      </p>
      <ul>
        <li>
          <strong>Factual Biblical Reporting:</strong> We only flag a name as biblical if it demonstrably appears in the canonical Old or New Testaments. We provide specific book and chapter references so parents and scholars can verify the context.
        </li>
        <li>
          <strong>Distinction Between Biblical and Traditional:</strong> We clearly delineate between figures appearing in Scripture and post-biblical Christian names, such as early church martyrs, desert fathers, saints, and virtue names.
        </li>
        <li>
          <strong>Honest Handling of Disputed Meanings:</strong> Many ancient names (such as Aaron, Mary, or Moses) have multiple proposed etymologies among semitic linguists. Rather than manufacturing a single definitive claim, we explicitly document disputed interpretations.
        </li>
        <li>
          <strong>Respect for Cultural Heritage:</strong> We recognize that names used in Christian communities around the world often have deep pre-Christian Hebrew, Greek, Roman, Celtic, Germanic, or African roots. We document these origins truthfully without implying exclusivity.
        </li>
        <li>
          <strong>No Synthetic or Fabricated Content:</strong> We do not use automated generators to create fake names, invented biblical verses, or arbitrary popularity statistics.
        </li>
      </ul>

      <h2>The Classification of Names</h2>
      <p>
        Names in our dictionary are classified based on linguistic lineage and usage:
      </p>
      <dl className="mt-4 space-y-3">
        <div>
          <dt className="font-semibold text-oxblood">Biblical Hebrew &amp; Aramaic</dt>
          <dd className="text-ink-soft">
            Names derived from ancient West Semitic roots, often featuring theophoric elements such as <em>El</em> (&ldquo;God&rdquo;) or <em>Yah/Yeho</em> (&ldquo;Yahweh&rdquo;).
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-oxblood">New Testament Greek</dt>
          <dd className="text-ink-soft">
            Names from the Koine Greek text of the Gospels, Acts, and Epistles, alongside early Christian saint names of Hellenic origin.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-oxblood">Early Christian Latin</dt>
          <dd className="text-ink-soft">
            Names borne by Roman martyrs, church fathers (such as Augustine, Ambrose, and Jerome), and monastic founders.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-oxblood">Virtue and Devotional Names</dt>
          <dd className="text-ink-soft">
            Names reflecting theological and moral virtues (such as Grace, Faith, Hope, and Mercy), prominent in English Puritan and Reformation history.
          </dd>
        </div>
      </dl>

      <h2>Correction Policy</h2>
      <p>
        Onomastics is an evolving scholarly field. If you discover a factual inaccuracy, an omitted biblical cross-reference, or an updated linguistic consensus, we encourage you to contact our editorial desk via our{" "}
        <Link href="/contact" className="text-oxblood underline">
          Contact page
        </Link>
        . All submissions are reviewed against peer-reviewed lexicons and primary biblical texts.
      </p>
    </LegalPage>
  );
}

