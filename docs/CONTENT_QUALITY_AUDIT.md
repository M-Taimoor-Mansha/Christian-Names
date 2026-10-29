# Content Quality and Trust Audit

**Project:** Christian Names Dictionary  
**Date:** October 29, 2026  
**Auditor:** Content Quality Editor & Technical Ethicist  

---

## 1. Editorial Integrity & Baseline Dataset Review

### Current Dataset Evaluation (300 Names)
- **Strengths:** Existing 150 boys' and 150 girls' records contain accurate basic meanings and genuine Bible citations (e.g., `Aaron` -> `Exodus 4:14`, `Abigail` -> `1 Samuel 25:3`).
- **Gaps & Weaknesses:**
  1. **Volume:** Only 300 names total. High-profile biblical and historical names are missing (e.g., `Gideon`, `Ezekiel`, `Bartholomew`, `Priscilla`, `Tabitha`, `Phoebe`, `Lydia`).
  2. **Pronunciation Coverage:** Only a fraction of entries have phonetic or pronunciation keys.
  3. **Variants & Cross-Linguistic Links:** Very few records list spelling variants (e.g., *John* -> *Jean, Juan, Giovanni, Ian, Sean*; *Mary* -> *Maria, Miriam, Moira*).
  4. **Boilerplate Text:** The "About the name" paragraph on detail pages relies on a single generic interpolated string:
     `"{name} is a {gender}'s name of {origin} origin that means '{meaning}'. It is widely used among Christian families..."`
     This provides low editorial value and risks algorithmic classification as thin content.

---

## 2. Standards for Building the 3,000-Name Database

To reach the validated target of **1,500 distinct boys' names** and **1,500 distinct girls' names**, the following editorial principles must be strictly enforced:

### Rule 1: No Synthetic or Invented Entries
- Every name must correspond to a verified historical, biblical, or culturally documented Christian name.
- No nonsense syllable combinations or machine-hallucinated figures.

### Rule 2: Strict Linguistic & Etymological Precision
- **Hebrew Names:** Grounded in Biblical Hebrew roots (e.g., *El* = God, *Yah/Yeho* = Yahweh, *Shalom* = peace, *Melekh* = king).
- **Greek Names:** Rooted in Koine Greek (New Testament) or classical Greek adopted by early Christians (e.g., *Theos* = God, *Nike* = victory, *Aggelos* = messenger).
- **Latin Names:** Rooted in Roman Christian traditions, saints, and martyrs (e.g., *Benedictus* = blessed, *Paulus* = small/humble, *Clara* = clear/bright).
- **Aramaic Names:** Rooted in First-Century Levantine Aramaic (e.g., *Martha* = lady/mistress, *Thomas* = twin, *Tabitha* = gazelle).
- **Virtue & Traditional Names:** Clearly attributed to English Puritan/virtue traditions (*Faith*, *Hope*, *Charity*, *Grace*, *Mercy*) or Celtic/Germanic saint traditions.

### Rule 3: Scripture Verification & Honesty
- If a name is flagged `biblical: true`, it must contain a genuine Bible reference citing the specific book and chapter/verse, summarizing the figure's role honestly.
- If a name was not present in the canonical Bible (e.g., *Christopher*, *Nicholas*, *Theresa*, *Dominic*, *Austin*), it must be flagged `biblical: false`, and its reference must document its early Christian, saintly, or virtue heritage rather than inventing Scripture.

### Rule 4: Normalization and Zero Duplication
- Normalization algorithm: lowercase and trimmed comparison of names and slugs.
- A unisex name must be assigned to its primary historical category or clearly distinguished without duplicate slug collisions.
- Distinct spelling variations (*Stephen* and *Steven*) may exist if each represents a distinct etymological lineage, but duplicate entries for the identical spelling are forbidden.

---

## 3. Trust Pages & Transparency Review

| Page | Current Status | Defect / Requirement |
|---|---|---|
| **`/about`** | Bare-bones 3-paragraph page. | Needs comprehensive editorial manifesto, scope explanation, and commitment to free access. |
| **`/editorial-policy`** | Missing (404). | Must outline standards for meanings, handling disputed origins, and how users can submit factual corrections. |
| **`/sources`** | Missing (404). | Must document academic lexicons, concordances, Bible translations (ESV, NIV, KJV), and onomastic resources. |
| **`/contact`** | Displays placeholder when email unset. | Retain safe fallback when env unset; add guidance on what to include when suggesting corrections. |
| **`/privacy-policy`** | Basic privacy policy present. | Ensure compliance with Google AdSense disclosures, cookie management, and absence of tracking/accounts. |
| **`/terms`** | Basic terms present. | Clarify non-commercial fair use, accuracy disclaimers, and limitation of liability. |
| **`/donate`** | Only exists as modal with failing Stripe checkout. | Create dedicated, dignified voluntary donation page explaining that the site is 100% free with no paywalls. |

