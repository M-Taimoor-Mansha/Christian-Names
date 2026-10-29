# Project Audit: Christian Names

**Date:** October 29, 2026  
**Auditor:** Senior Full-Stack Engineer, Technical SEO & Accessibility Specialist  
**Repository:** https://github.com/M-Taimoor-Mansha/Christian-Names  
**Branch:** `main` (clean baseline)

---

## 1. Executive Summary

A comprehensive architectural, technical, editorial, accessibility, and monetization audit was conducted across the Christian Names codebase. The project is built with **Next.js 16.4.3 (App Router with Turbopack)**, **React 19.3.0**, **Tailwind CSS v4**, and **TypeScript 5**.

While the foundation has an attractive editorial design concept (ivory parchment, deep navy cloth, oxblood accents, EB Garamond typography), several critical architectural bugs, severe content gaps, broken builds under strict linting, and significant data deficits were uncovered:

1. **Critical Homepage Defect (Severity: Blocker):** `app/page.tsx` was accidentally overwritten with the contents of `TermsPage`. The root URL (`/`) currently renders the "Terms of Use" page rather than the Christian Names homepage, search, or dictionary discovery tools.
2. **ESLint Linting Error (Severity: High):** `components/DonationModal.tsx` violates React Hooks immutability rules (`window.location.href = data.url;`), causing `npm run lint` to fail with exit code 1.
3. **Database Scale Deficit (Severity: High):** The current dataset contains only 150 boys' names and 150 girls' names (300 names total), falling 2,700 names short of the required 3,000 distinct names (1,500 boys + 1,500 girls).
4. **Fabricated AdSense Configurations (Severity: High / Policy Risk):** Name detail pages hardcode dummy slot IDs (`slot="0000000001"` and `slot="0000000002"`), which would trigger invalid traffic or AdSense policy rejections if loaded with a live client ID.
5. **Broken Donation Links & Non-Functional Stripe Flow (Severity: Medium):** `.env.local` contains malformed URL formatting (`NEXT_PUBLIC_DONATE_URL= buymeacoffee.com/TaimoorJutt` with leading space and missing `https://`), causing broken redirects. The Stripe API route is non-functional without configured API secrets and returns 501.
6. **Missing Trust, Editorial, and Navigational Pages (Severity: Medium):** Missing `/editorial-policy`, `/sources`, `/donate`, `/biblical-names`, and alphabetical browsing routes (`/names/a`–`/names/z`).
7. **Generic AI Boilerplate in Detail Pages (Severity: Medium):** Individual name pages render identical formulaic boilerplate sentences rather than genuine etymological, historical, and biblical insights.

---

## 2. Technical Stack & Build Configuration

| Component | Technology | Version | Evaluation |
|---|---|---|---|
| **Framework** | Next.js (App Router, Turbopack) | `16.4.3` | Modern, fast Turbopack compilation; SSG page generation works cleanly. |
| **Runtime / UI** | React / React DOM | `19.3.0` | React 19 stable; strict hook immutability checks active in ESLint 9. |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/turbopack`) | `^4.0.0` | Modern CSS `@theme` variables for warm editorial palette (`--color-paper`, `--color-cloth`, `--color-oxblood`, `--color-gold`). |
| **Language** | TypeScript | `^5.0.0` | Strict typechecking enabled; zero TypeScript errors reported by `tsc --noEmit`. |
| **Search Engine** | Fuse.js | `^7.5.0` | Client-side search with prebuilt JSON index (`public/search-index.json`). |
| **Icons** | Lucide React | `^1.63.0` | Lightweight SVG icons (`Heart`, `Search`, `X`). |
| **Data Storage** | Static JSON | Flat files | `data/boy-names.json` and `data/girl-names.json` bundled at build time. |

---

## 3. Detailed Audit Findings

### Finding 1: Root Route Overwritten by Terms of Use
- **Severity:** Blocker (Verified Defect)
- **File:** `app/page.tsx`
- **Evidence:** Commit `a9ea12190403857dbe6afa19d19823f93fbd4183` mistakenly replaced the homepage with `TermsPage`.
- **Impact:** Any user or web crawler landing on `https://christiannames.org/` sees "Terms of Use" instead of a searchable baby name dictionary.
- **Recommended Fix:** Re-implement a rich, editorial homepage featuring a hero banner, instant live search, quick-browse pills (boys, girls, biblical, origins), letter-by-letter index, featured and curated names, and educational guidance.

### Finding 2: ESLint Rule Violation in `DonationModal.tsx`
- **Severity:** High (Verified Defect)
- **File:** `components/DonationModal.tsx` (Line 35)
- **Evidence:** `npm run lint` fails with:
  ```text
  D:\Projects\christian-names\components\DonationModal.tsx
    35:7  error  Error: This value cannot be modified
    Modifying a variable defined outside a component or hook is not allowed.
    react-hooks/immutability
  ```
- **Impact:** Automated CI/CD pipelines fail; code does not conform to React 19 ESLint compiler requirements.
- **Recommended Fix:** Refactor direct mutation of `window.location.href` to safe window assign (`window.location.assign(data.url)`) or handle navigation via client effects/state.

### Finding 3: Database Deficit (300 Names vs 3,000 Required)
- **Severity:** High (Verified Defect)
- **Files:** `data/boy-names.json`, `data/girl-names.json`, `scripts/validate-data.mjs`
- **Evidence:** `node scripts/validate-data.mjs` reports exactly 150 boys' names and 150 girls' names.
- **Impact:** Narrow dictionary scope; limits organic search footprint; misses thousands of legitimate biblical, Hebrew, Greek, Latin, and historical Christian names.
- **Recommended Fix:** Curate and validate a comprehensive, deduplicated database of exactly 1,500 boys' names and 1,500 girls' names with accurate etymologies, biblical citations, linguistic origins, pronunciations, variants, and related names.

### Finding 4: Fabricated Ad Unit IDs and Risky Placement
- **Severity:** High (Policy Risk)
- **File:** `app/names/[slug]/page.tsx`
- **Evidence:**
  ```tsx
  <AdSlot slot="0000000001" />
  <AdSlot slot="0000000002" />
  ```
- **Impact:** If a user configures `NEXT_PUBLIC_ADSENSE_ID` in `.env.local`, AdSense will attempt to serve ads to invalid units `0000000001`, resulting in console errors, wasted requests, and potential policy violations for invalid implementations.
- **Recommended Fix:** Make ad slot IDs configurable or disable ad rendering until real unit IDs are provided. Prevent dummy slots from rendering. Ensure clear visual separation between ads and dictionary definitions.

### Finding 5: Malformed Environment Variable & Fragile Donation UX
- **Severity:** Medium (Verified Defect)
- **File:** `.env.local`, `components/DonationModal.tsx`
- **Evidence:** `.env.local` contains `NEXT_PUBLIC_DONATE_URL= buymeacoffee.com/TaimoorJutt`. The leading space and absence of `https://` causes `<a href={DONATE_URL}>` to resolve to an invalid local relative path.
- **Impact:** Clicking "Buy us a coffee" fails or 404s. Furthermore, modal buttons attempt to call `/api/donate` which fails with 501 (Stripe not configured).
- **Recommended Fix:** Sanitize donation URLs to ensure valid `https://` protocol. Offer a dedicated `/donate` page explaining voluntary support with clear, non-coercive donation options. Gracefully disable card payment buttons when `STRIPE_SECRET_KEY` is unset.

### Finding 6: Missing Routes & Thin Crawl Tree
- **Severity:** Medium (Architectural Gap)
- **Evidence:** The current router only exposes `/`, `/christian-boy-names`, `/christian-girl-names`, and `/names/[slug]`. There are no dedicated routes for:
  - Alphabetical hubs (`/names/a` through `/names/z`)
  - Biblical curation (`/biblical-names`)
  - Linguistic origins (`/origins/hebrew`, `/origins/greek`, `/origins/latin`)
  - Editorial policy (`/editorial-policy`)
  - Sources & methodology (`/sources`)
  - Dedicated donation page (`/donate`)
- **Impact:** Search engine bots cannot discover names clustered by origin or letter through crawlable HTML pathways; users lack direct landing pages for high-intent search queries like "Biblical baby names" or "Hebrew Christian names".
- **Recommended Fix:** Create dedicated, statically generated routes with unique metadata, introductory editorial prose, and structured navigation.

### Finding 7: Lack of Name Sharing & Link Copy Features
- **Severity:** Low (Feature Gap)
- **File:** `app/names/[slug]/page.tsx`
- **Evidence:** Users have no built-in way to copy the name, copy the URL, or trigger native Web Share API on mobile.
- **Recommended Fix:** Add an accessible, interactive `ShareButton` component with clipboard copy fallback and tooltip feedback.

---

## 4. Verification Criteria for Remediation

| Check | Baseline | Target |
|---|---|---|
| `npm run lint` | Exits with code 1 | Exits with code 0 (clean) |
| `npx tsc --noEmit` | Clean (0 errors) | Clean (0 errors) |
| `npm run validate` | 300 names | Exactly 1,500 boys & 1,500 girls (3,000 total) |
| `npm run build` | Builds 314 routes | Builds all static routes (3,000+ routes) |
| Homepage (`/`) | Renders Terms of Use | Renders rich editorial dictionary homepage |
| Broken Links / 404s | Found in donation link | 0 broken internal or configured external links |
| Accessibility (WCAG 2.2 AA) | Missing ARIA labels in places | Complete keyboard navigation & screen-reader support |

