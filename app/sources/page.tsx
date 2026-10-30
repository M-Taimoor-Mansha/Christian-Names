import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Sources & Methodology",
  description:
    "Primary lexicons, biblical concordances, academic references, and onomastic resources used to compile the Christian Names dictionary.",
  alternates: { canonical: "/sources" },
};

export default function SourcesPage() {
  return (
    <LegalPage title="Sources & Methodology" updated="October 29, 2026" path="/sources">
      <p>
        The Christian Names dictionary is compiled from established historical, biblical, and etymological authorities. We prioritize primary texts and peer-reviewed onomastic scholarship over unverified commercial name lists.
      </p>

      <h2>Biblical Concordances and Lexicons</h2>
      <p>
        For Hebrew, Aramaic, and Greek biblical names and their semantic roots, our primary references include:
      </p>
      <ul>
        <li>
          <strong>Brown-Driver-Briggs Hebrew and English Lexicon (BDB):</strong> Standard academic reference for Biblical Hebrew and Aramaic morphology and root etymologies.
        </li>
        <li>
          <strong>Gesenius’ Hebrew and Chaldee Lexicon to the Old Testament Scriptures:</strong> Renowned nineteenth-century authority on West Semitic onomastics.
        </li>
        <li>
          <strong>Bauer-Danker-Arndt-Gingrich (BDAG) Greek-English Lexicon of the New Testament:</strong> The definitive academic authority for Koine Greek vocabulary and names.
        </li>
        <li>
          <strong>Strong’s Exhaustive Concordance of the Bible:</strong> Standard textual index cross-referencing biblical names with Hebrew and Greek root words.
        </li>
        <li>
          <strong>The Septuagint (LXX) and Greek New Testament (NA28 / UBS5):</strong> Canonical Greek source texts for Hellenized name forms and spellings.
        </li>
      </ul>

      <h2>Historical, Saintly &amp; Onomastic Dictionaries</h2>
      <p>
        For historical Christian names, saints, martyrs, and European language variations:
      </p>
      <ul>
        <li>
          <strong>The Oxford Dictionary of First Names (Hanks, Hardcastle, and Hodges):</strong> Exhaustive historical and linguistic guide to personal names in the English-speaking world and Europe.
        </li>
        <li>
          <strong>Butler’s Lives of the Saints:</strong> Authoritative historical documentation on early Christian martyrs, monastic figures, and church history.
        </li>
        <li>
          <strong>The Catholic Encyclopedia (New Advent):</strong> Comprehensive historical reference on patristic figures, church councils, and early Christian traditions.
        </li>
        <li>
          <strong>Dictionary of Christian Biography (Wace and Piercy):</strong> Scholarly survey of early Christian leaders, confessors, and writers up to the eighth century.
        </li>
      </ul>

      <h2>Bible Translations Consulted</h2>
      <p>
        English scripture citations are cross-referenced across major accurate modern translations:
      </p>
      <ul>
        <li>English Standard Version (ESV)</li>
        <li>New International Version (NIV)</li>
        <li>New Revised Standard Version (NRSV)</li>
        <li>King James Version (KJV) for historical English usage</li>
      </ul>

      <h2>Editorial Independence</h2>
      <p>
        Christian Names maintains complete editorial independence. We do not accept sponsored entries, paid ranking placements, or promotional modifications to historical or biblical records.
      </p>
    </LegalPage>
  );
}

