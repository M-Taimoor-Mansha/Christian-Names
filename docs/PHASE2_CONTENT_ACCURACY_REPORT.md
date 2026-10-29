# Phase 2 Content Accuracy & Lexicographical Audit Report

**Project:** Christian Names Dictionary (`christian-names`)  
**Scope:** Exhaustive Editorial & Data Quality Audit of 3,000 Records (`data/boy-names.json` and `data/girl-names.json`)  
**Standard:** Scholarly Lexicography, Authentic Biblical Onomastics, Transparent Data Governance  

---

## 1. Executive Data Census

| Metric | Boys' Dataset | Girls' Dataset | Total / Combined |
| :--- | :--- | :--- | :--- |
| **Total Headword Records** | 1,500 | 1,500 | **3,000** |
| **Unique Slugs** | 1,500 | 1,500 | **3,000** (Zero cross-dataset collisions) |
| **Biblical Classification** | 1,452 (96.8%) | 171 (11.4%) | **1,623 (54.1%)** |
| **Traditional / Heritage** | 48 (3.2%) | 1,329 (88.6%) | **1,377 (45.9%)** |
| **Empty Pronunciations** | 838 (55.9%) | 1,116 (74.4%) | **1,954 (65.1%)** |
| **Generic Boilerplate Meanings** | 235 (15.7%) | 908 (60.5%) | **1,143 (38.1%)** |

> [!IMPORTANT]
> **Schema Validity vs. Editorial Truth:** While the dataset passes all automated programmatic schemas (`npm run validate` exits with code 0), independent editorial inspection reveals significant qualitative discrepancies. A syntactically valid JSON entry does not guarantee historical or theological accuracy.

---

## 2. Origin Distribution & Lexical Breakdown

### Boys' Dataset Origins (1,500 records)
1. **Hebrew:** 1,369 (91.3%)
2. **Greek:** 56 (3.7%)
3. **Latin:** 35 (2.3%)
4. **Persian:** 13 (0.9%)
5. **Aramaic:** 8 (0.5%)
6. **Other (Babylonian, Old English, etc.):** 19 (1.3%)

*Observation:* The boys' dataset is heavily weighted toward Old Testament genealogical records derived from Hitchcock's Bible Names Dictionary and public domain biblical person registers.

### Girls' Dataset Origins (1,500 records)
1. **Latin:** 500 (33.3%)
2. **English:** 281 (18.7%)
3. **Germanic:** 245 (16.3%)
4. **Hebrew:** 179 (11.9%)
5. **French:** 100 (6.7%)
6. **Spanish:** 23 (1.5%)
7. **Irish:** 20 (1.3%)
8. **Greek / Scottish / Italian / Others:** 152 (10.1%)

*Observation:* The girls' dataset draws heavily from historical 19th- and early 20th-century baptismal registers and Social Security Administration (SSA) historical name frequencies.

---

## 3. High-Priority Editorial Findings & Anomalies

### A. Gender Misattributions
1. **Jochebed (`slug: jochebed`) in Boys' Dataset:**
   - **Current Entry:** Listed as a boy with meaning *"Yahweh is glory"* and note *"Numbers 26:59 — Father in Levite ancestry"*.
   - **Historical Fact:** In Exodus 6:20 and Numbers 26:59, Jochebed (*Yōḵeḇeḏ*) is unequivocally the **mother** of Moses, Aaron, and Miriam, and wife of Amram. Placing Jochebed in the boys' directory is an editorial error originating from unverified automated census pipelines.
2. **Classic Boys' Names in Girls' Dataset with `-girl` Slugs:**
   - `george-girl` (George) — Assigned gender: `girl`, origin: `Germanic`, meaning: *"Noble in spirit; blessed"*.
   - `john-girl` (John) — Assigned gender: `girl`, origin: `Germanic`, meaning: *"Noble in spirit; blessed"*.
   - `james-girl` (James) — Assigned gender: `girl`, origin: `Germanic`, meaning: *"Noble in spirit; blessed"*.
   - `thomas-girl` (Thomas) — Assigned gender: `girl`, origin: `Germanic`, meaning: *"Noble in spirit; blessed"*.
   - `joseph-girl` (Joseph) — Assigned gender: `girl`, origin: `Germanic`, meaning: *"Noble in spirit; blessed"*.
   - `leo-girl` (Leo) — Assigned gender: `girl`, origin: `Germanic`, meaning: *"Noble in spirit; blessed"*.
   - **Root Cause:** In 19th-century US SSA birth records, clerical errors or rare family naming conventions occasionally registered male infants under female registers. When the raw SSA female name list was processed during Phase 1, these names were accepted and assigned fallback Germanic origins and generic meanings.
3. **Zelophehad (`slug: zelophehad-girl`) in Girls' Dataset:**
   - **Current Entry:** Assigned gender: `girl` with citation *"second wife of Machir [or second sister of the wife?] (1CH 7:15)"*.
   - **Historical Fact:** Zelophehad (*Tzelofchad*) was a Manassite man renowned for having five daughters (Mahlah, Noah, Hoglah, Milcah, and Tirzah) who petitioned Moses for inheritance rights (Numbers 27). The Hebrew text of 1 Chron 7:15 is an elliptical genealogical notation; creating a separate female entry for Zelophehad introduces confusion.

### B. Generic Boilerplate Definitions
A significant proportion of records contain repetitive synthetic definitions created during bulk curation:
- **Girls' Boilerplate (908 names / 60.5%):**
  - *"Noble and gracious; pure of heart"* — 378 records (e.g., Alba, Adda, Adella, Alma, Almeda).
  - *"Joyous; beloved daughter of grace"* — 246 records (e.g., Abbie, Abby, Addie, Aggie, Allie).
  - *"Noble in spirit; blessed"* — 210 records (e.g., Adell, Aileen, Aimee, Allene).
  - *"Graceful little one; pledged to God"* — 54 records (e.g., Adaline, Adelle, Adline).
  - *"Biblical woman of faith"* — 20 records (e.g., Hushim, Maacah, Timna).
- **Boys' Boilerplate (235 names / 15.7%):**
  - *"Biblical name of Hebrew origin"* — 235 records (e.g., Ahban, Ahishahar, Ahuzzam, Anath, Arodi, Arza, Asarel).

### C. Tribal and Gentilic Names Listed as Individuals
Several Old Testament tribal or regional group names (gentilics) were ingested as individual personal names:
- `Ark` (`slug: ark`): Cited as *"son of Canaan (GEN 10:15)"*. In Genesis 10:17, the text reads *Ha'Arki* (the Arkite people residing in northern Lebanon), not a personal given name.
- `Arvad` (`slug: arvad`): Cited as *"son of Canaan (GEN 10:15)"*. Refers to the Arvadites (*Ha'Arvadi*), the island inhabitants of modern Ruad, Syria.
- `Amor` (`slug: amor`): Cited as *"son of Canaan"*. Refers to the Amorites (*Ha'Emori*).
- `Anam` (`slug: anam`): Cited as *"son of Mizraim"*. Refers to the Anamim people (*'Anamim*).

---

## 4. Dual-Gender & Overlapping Names Audit

Exactly 35 headwords appear in both the boys' and girls' datasets. The following matrix details their status:

| Name | Boy Slug | Girl Slug | Evaluation & Editorial Assessment |
| :--- | :--- | :--- | :--- |
| **Abihail** | `abihail` | `abihail-girl` | **Valid Dual-Gender.** Levite male (Num 3:35) & wife of Abishur / mother of Esther (1 Chr 2:29; Esth 2:15). |
| **Abijah** | `abijah` | `abijah-girl` | **Valid Dual-Gender.** King of Judah (2 Chr 13) & mother of Hezekiah (2 Chr 29:1). |
| **Athaliah**| `athaliah` | `athaliah-girl`| **Valid Dual-Gender.** Queen of Judah (2 Ki 11) & Benjaminite man (1 Chr 8:26). |
| **Eden** | `eden` | `eden-girl` | **Valid Unisex.** Garden of Delight & Levite minister (2 Chr 29:12). |
| **Gomer** | `gomer` | `gomer-girl` | **Valid Dual-Gender.** Son of Japheth (Gen 10:2) & wife of prophet Hosea (Hos 1:3). |
| **Noah** | `noah` | `noah-girl` | **Valid Distinction.** Patriarch (*Nōaḥ*, "rest") vs. Daughter of Zelophehad (*Nō‘āh*, "movement"). |
| **Puah** | `puah` | `puah-girl` | **Valid Dual-Gender.** Hebrew midwife (Ex 1:15) & Issacharite judge/clan (Jdg 10:1). |
| **Shelomith**| `shelomith`| `shelomith-girl`| **Valid Dual-Gender.** Mother in Lev 24:11 & royal prince in 1 Chr 3:19. |
| **George** | `george` | `george-girl` | **Defect.** Masculine name falsely duplicated in female dataset. |
| **John** | `john` | `john-girl` | **Defect.** Masculine name falsely duplicated in female dataset. |
| **James** | `james` | `james-girl` | **Defect.** Masculine name falsely duplicated in female dataset. |
| **Thomas** | `thomas` | `thomas-girl` | **Defect.** Masculine name falsely duplicated in female dataset. |
| **Joseph** | `joseph` | `joseph-girl` | **Defect.** Masculine name falsely duplicated in female dataset. |
| **Leo** | `leo` | `leo-girl` | **Defect.** Masculine name falsely duplicated in female dataset. |

---

## 5. Phonetic & Pronunciation Audit

- **Boy Names with Pronunciation:** 662 / 1,500 (44.1%)
- **Girl Names with Pronunciation:** 384 / 1,500 (25.6%)
- **Overall Pronunciation Coverage:** 1,046 / 3,000 (34.9%)

*Assessment:* While the primary headwords (e.g., Aaron, Benjamin, Gabriel, Hannah, Mary) possess accurate phonetic spellings (e.g., `/AIR-uhn/`, `/HAN-uh/`), secondary entries currently render without phonetic assistance. The display template handles missing pronunciations gracefully by omitting the element without layout distortion.

---

## 6. Scholarly Remediation Strategy

To preserve repository stability and adhere strictly to user rules (never fabricating data or silently destroying entries), the following phased roadmap is established:

1. **Phase 2 Baseline (Current State):** Document all verified anomalies honestly. Preserve the 3,000-name integrity and build stability.
2. **Phase 3 Curation (Editorial Review):**
   - Replace the 6 misattributed masculine entries in `data/girl-names.json` (`george-girl`, `john-girl`, etc.) with authentic historical Christian female names (such as *Scholastica*, *Macrina*, *Perpetua*, *Marcella*, *Olympia*, *Kassiani*).
   - Correct `jochebed` gender tag to feminine while moving a displaced biblical male entry (e.g., *Elimelech*) into boys.
   - Clarify gentilic entries (`Ark`, `Arvad`, `Amor`) by adjusting the editorial note to indicate "Gentilic clan associated with the biblical table of nations".
   - Systematically replace repetitive boilerplate definitions using primary lexicons:
     - Brown-Driver-Briggs (BDB) & Gesenius for Hebrew entries.
     - Bauer-Danker-Arndt-Gingrich (BDAG) for New Testament Greek entries.
     - Lewis & Short for Latin ecclesiastical entries.

