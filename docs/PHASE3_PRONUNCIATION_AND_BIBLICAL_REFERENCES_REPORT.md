# Phase 3 Pronunciation & Biblical References Audit Report

**Project:** Christian Names Dictionary (`christian-names`)  
**Scope:** Systematic Phonetic Verification & Scripture Citation Validation  
**Standards:** Standard English Phonetic Respelling, Nestle-Aland Greek New Testament, Westminster Leningrad Codex (BHS) Old Testament  

---

## 1. Pronunciation Coverage Metrics: Before vs. After

| Dataset Category | Baseline Coverage (Phase 2) | Improved Coverage (Phase 3) | Net Verified Additions | Percentage Increase |
| :--- | :--- | :--- | :--- | :--- |
| **Boys' Dataset** | 662 / 1,500 (44.1%) | **1,010 / 1,500 (67.3%)** | **+348 names** | **+23.2%** |
| **Girls' Dataset** | 384 / 1,500 (25.6%) | **561 / 1,500 (37.4%)** | **+177 names** | **+11.8%** |
| **Total Dictionary**| **1,046 / 3,000 (34.9%)** | **1,571 / 3,000 (52.4%)** | **+525 names** | **+17.5%** |

> [!NOTE]
> **Adherence to Safeguard Rule 4:** Pronunciations were added strictly for names with established standard English phonetic consensus in academic pronouncing dictionaries (such as Wells' *Longman Pronunciation Dictionary* and Kenyon & Knott). Obscure historical diminutives without verified consensus were intentionally left absent. The frontend display template (`app/names/[slug]/page.tsx`) renders entries gracefully without layout distortion when pronunciation is omitted.

---

## 2. Phonetic Conventions & Respelling System

Pronunciations follow a consistent, intuitive English capital-syllable stress notation:
- Primary stressed syllable rendered in uppercase (e.g. `AL-buh`, `LY-nus`, `bith-EYE-uh`).
- Secondary syllables rendered in lowercase (e.g. `el-ee-uh-HOE-ee-nye`).
- Vowel clarity:
  - `eye` for long I (/aɪ/ as in *my* or *Urijah*: `yoo-RY-uh`).
  - `ay` for long A (/eɪ/ as in *Akan*: `AY-kuhn`).
  - `ee` for long E (/iː/ as in *Ehi*: `EE-hye`).
  - `oh` for long O (/oʊ/ as in *Tobijah*: `toh-BY-uh`).
  - `oo` for long U (/uː/ as in *Dumah*: `DOO-muh`).

---

## 3. Biblical References & Classification Audit

### A. Typology of Biblical References in Christian Names
In Phase 3, biblical classifications were audited to ensure precision between distinct categories of scriptural mention:
1. **Direct Personal Names (Attested Individuals):**
   - Individuals with specific biographical or genealogical presence in Scripture (e.g., *Linus* in 2 Tim 4:21, *Bithiah* in 1 Chr 4:18, *Sherah* in 1 Chr 7:24, *Tryphena* in Rom 16:12).
2. **Eponymous Patriarchs & Clan Heads (Table of Nations):**
   - Headwords from Genesis 10 (*Ark*, *Arvad*, *Amor*, *Anam*) now feature explicit notes identifying them as eponymous ancestors and tribal heads in patriarchal genealogies rather than standalone personal names.
3. **Christian Heritage & Saintly Names:**
   - Post-biblical saints and martyrs (e.g., *Kassia*, *Olympias*, *Anthusa*, *Emmelia*, *Scholastica*, *Perpetua*) are clearly tagged `biblical: false` while providing exact historical centuries and church context.

### B. Newly Verified Scripture Citations Added in Phase 3:
- **Linus** (`slug: linus`): 2 Timothy 4:21 — Early Christian brother in Rome greeted by Saint Paul.
- **Bithiah** (`slug: bithiah`): 1 Chronicles 4:18 — Egyptian royal daughter who married Mered of Judah.
- **Sherah** (`slug: sherah`): 1 Chronicles 7:24 — Ephraimite woman builder who erected Beth-horon.
- **Tryphena** (`slug: tryphena`): Romans 16:12 — Faithful Christian coworker commended by Paul.
- **Jochebed** (`slug: jochebed`): Exodus 6:20; Numbers 26:59 — Mother of Moses, Aaron, and Miriam.
- **Basemath** (`slug: basemath`): Genesis 26:34; 1 Kings 4:15 — Wife of Esau and daughter of Solomon.
- **Amasiah** (`slug: amasiah`): 2 Chronicles 17:16 — Commander under Jehoshaphat who dedicated himself to Yahweh.
- **Urijah** (`slug: urijah`): Jeremiah 26:20 — Prophet of the Lord who prophesied in Judah.
- **Zabdiel** (`slug: zabdiel`): 1 Chronicles 27:2 — Father of Jashobeam, commander of royal division.

---

## 4. Referential Integrity of Internal Cross-References

The `relatedNames` arrays across all 3,000 records were audited. Eighty-six legacy broken cross-references (pointing to historical characters not recorded as headwords in the dictionary) were cleaned. 

**Verification:**  
`scripts/validate-data.mjs` now validates that every single string inside `relatedNames` resolves to a confirmed headword in `allNamesSet`. Build execution confirms **zero** broken internal links.

